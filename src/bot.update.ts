import { Action, Command, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { BotCommand } from 'typegram';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { BOT_COMMAND_NAME } from '@models/commands.model';
import { SCENE_ID, SceneContext } from '@models/scenes.model';
import { getDefinedBotCommands } from '@utils/command.utils';
import { NAVIGATION_CALLBACK } from '@models/navigation.model';
import { BotUserDataService, BotUserStats } from '@modules/bot-user-data';
import { PARSE_MODE } from '@models/tg.model';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private readonly botUserDataService: BotUserDataService
  ) {}

  @Start()
  async onStart(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      const definedBotCommands: BotCommand[] = getDefinedBotCommands();
      await this.bot.telegram.setMyCommands(definedBotCommands);
      await ctx.scene.enter(SCENE_ID.SUBSCRIPTION);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  @Command(BOT_COMMAND_NAME.RECIPES)
  async onRecipes(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.scene.enter(SCENE_ID.RECIPES);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  @Command(BOT_COMMAND_NAME.TIPS)
  async onTips(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.scene.enter(SCENE_ID.TIPS);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  @Command(BOT_COMMAND_NAME.SKIN_TYPE_TEST)
  async onSkinTypeTest(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.scene.enter(SCENE_ID.SKIN_TYPE_TEST);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  @Command(BOT_COMMAND_NAME.SETTINGS)
  async onSettings(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.scene.enter(SCENE_ID.SETTINGS);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  @Command(BOT_COMMAND_NAME.STATS)
  async onStats(@Ctx() ctx: Context): Promise<void> {
    try {
      const statistics: BotUserStats = await this.botUserDataService.getStats();
      const localizationStrings: Record<keyof BotUserStats, string> = {
        total: 'Всього користувачів',
        newToday: 'Нових сьогодні',
        active: 'Зараз активних',
        notificationsDisabled: 'З вимкненими сповіщеннями',
        changedNotificationTime: 'Змінили час сповіщень',
        completedSkinTest: 'Пройшли тест на тип шкіри',
      };
      const stringifiedStatistics: string = Object.entries(statistics)
        .map(([key, value]: [string, number]): string => `${localizationStrings[key]}: ${value}`)
        .join('\n');
      await ctx.reply(`<strong>Статистика бота:</strong>\n\n<code>${stringifiedStatistics}</code>`, { parse_mode: PARSE_MODE.HTML });
    } catch (error) {
      this.logger.error(`${ctx.text} onStats(...): ${error.message}`);
    }
  }

  @Action(NAVIGATION_CALLBACK.CONFIRM)
  async onConfirm(@Ctx() ctx: Context): Promise<void> {
    try {
      await ctx.answerCbQuery();
      try {
        await ctx.editMessageText(`✅ ${ctx.text || 'Зроблено'}`);
      } catch (error) {
        this.logger.error(`Failed to edit message: ${error.message}`);
        await ctx.reply('✅ Зроблено');
      }
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }
}
