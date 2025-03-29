import { Action, Command, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { BotCommand, WebhookInfo } from 'typegram';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { SCENE_ID, SceneContext, NAVIGATION_CALLBACK, PARSE_MODE, BOT_COMMAND_DESCRIPTION, BOT_COMMAND_NAME } from './models';
import { getDefinedBotCommands } from './utils/command.utils';
import { BotUser, BotUserDataService, UpdateBotUserDto } from '@sue-bot-platform/api';
import { get, isNil, omit } from 'lodash';
import { OnModuleInit } from '@nestjs/common';
import { BotUserStats } from '@sue-bot-platform/types';

@Update()
export class BotUpdate implements OnModuleInit {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private readonly botUserDataService: BotUserDataService
  ) {
    /**
     * Listen to all bot actions.
     * Update user data on each action to keep it up-to-date.
     */
    this.bot.use(async (ctx: Context, next: () => Promise<void>): Promise<void> => {
      try {
        const user: BotUser = await this.botUserDataService.findByChatId(ctx.from.id);
        const isStartCommand: boolean = ctx.text === '/start' || get(ctx.callbackQuery, 'data') === BOT_COMMAND_NAME.START;
        if (!isNil(user)) {
          await this.updateUserActivity(user, ctx);
          await next();
        } else if (isStartCommand) {
          await next();
        } else {
          await this.promptUserRegistration(ctx);
        }
      } catch (error) {
        this.logger.error(`update bot user: ${error.message}`);
      }
    });
  }

  async onModuleInit(): Promise<void> {
    const webhookInfo: WebhookInfo = await this.bot.telegram.getWebhookInfo();
    this.logger.info(`Webhook Info: ${JSON.stringify(webhookInfo)}`);
  }

  @Start()
  @Action(BOT_COMMAND_NAME.START)
  async onStart(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.deleteMessage();
      const definedBotCommands: BotCommand[] = getDefinedBotCommands();
      await this.bot.telegram.setMyCommands(definedBotCommands);
      await ctx.scene.enter(SCENE_ID.SUBSCRIPTION);
    } catch (error) {
      this.logger.error(`${ctx.text} onStart(...): ${error.message}`);
    }
  }

  @Command(BOT_COMMAND_NAME.RECIPES)
  async onRecipes(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.scene.enter(SCENE_ID.RECIPES);
    } catch (error) {
      this.logger.error(`${ctx.text} onRecipes(...): ${error.message}`);
    }
  }

  @Command(BOT_COMMAND_NAME.TIPS)
  async onTips(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.scene.enter(SCENE_ID.TIPS);
    } catch (error) {
      this.logger.error(`${ctx.text} onTips(...): ${error.message}`);
    }
  }

  @Command(BOT_COMMAND_NAME.SKIN_TYPE_TEST)
  async onSkinTypeTest(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.scene.enter(SCENE_ID.SKIN_TYPE_TEST);
    } catch (error) {
      this.logger.error(`${ctx.text} onSkinTypeTest(...): ${error.message}`);
    }
  }

  @Command(BOT_COMMAND_NAME.SETTINGS)
  async onSettings(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.scene.enter(SCENE_ID.SETTINGS);
    } catch (error) {
      this.logger.error(`${ctx.text} onSettings(...): ${error.message}`);
    }
  }

  @Command(BOT_COMMAND_NAME.STATS)
  async onStats(@Ctx() ctx: Context): Promise<void> {
    try {
      const statistics: BotUserStats = await this.botUserDataService.getStats();
      const LOCALIZATION_STRINGS: Record<keyof BotUserStats, string> = {
        total: 'Всього користувачів',
        newToday: 'Нових сьогодні',
        active: 'Активних сьогодні',
        blocked: 'Заблокували/Недоступні',
        notificationsDisabled: 'З вимкненими сповіщеннями',
        changedNotificationTime: 'Змінили час сповіщень',
        completedSkinTest: 'Пройшли тест на тип шкіри',
      };
      const stringifiedStatistics: string = Object.entries(statistics)
        .map(([key, value]: [string, number]): string => `${LOCALIZATION_STRINGS[key]}: ${value}`)
        .join('\n');
      await ctx.reply(`<strong>Статистика бота:</strong>\n\n<code>${stringifiedStatistics}</code>`, { parse_mode: PARSE_MODE.HTML });
    } catch (error) {
      this.logger.error(`${ctx.text} onStats(...): ${error.message}`);
    }
  }

  /**
   * Listen to all CONFIRM callbacks.
   * Update message text to show that the action was completed.
   */
  @Action(NAVIGATION_CALLBACK.CONFIRM)
  async onConfirm(@Ctx() ctx: Context): Promise<void> {
    try {
      await ctx.answerCbQuery();
      try {
        await ctx.editMessageText(`✅ ${ctx.text || 'Зроблено'}`);
        await this.botUserDataService.incrementDoneTasksCounter(ctx.from.id);
      } catch (error) {
        this.logger.error(`Failed to edit message: ${error.message}`);
        await ctx.reply('✅ Зроблено');
      }
    } catch (error) {
      this.logger.error(`${ctx.text} onConfirm(...): ${error.message}`);
    }
  }

  private async updateUserActivity(user: BotUser, ctx: Context): Promise<void> {
    if (!user.wasActiveToday) {
      const updateBotUserDto: UpdateBotUserDto = omit(ctx.from, 'id');
      await this.botUserDataService.update(ctx.from.id, { ...updateBotUserDto, chatId: ctx.from.id, wasActiveToday: true });
    }
  }

  private async promptUserRegistration(ctx: Context): Promise<void> {
    await ctx.reply(
      '❌ Ви не зареєстровані! Будь ласка, натисніть кнопку нижче або введіть команду /start для реєстрації.',
      Markup.inlineKeyboard([Markup.button.callback(BOT_COMMAND_DESCRIPTION.start, BOT_COMMAND_NAME.START)])
    );
  }
}
