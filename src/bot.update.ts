import { Command, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { BotCommand } from 'typegram';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { SCENE_ID, SceneContext, BOT_COMMAND_NAME } from '@models';
import { getDefinedBotCommands } from '@utils';

@Update()
export class BotUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf, @InjectPinoLogger() private readonly logger: PinoLogger) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    try {
      const definedBotCommands: BotCommand[] = getDefinedBotCommands();
      await this.bot.telegram.setMyCommands(definedBotCommands);
      const commands: BotCommand[] = await ctx.telegram.getMyCommands();
      const replyKeyboard = [];
      for (const command of commands) {
        replyKeyboard.push(Markup.button.text(`/${command.command}`));
      }
      await ctx.reply('Привіт!', Markup.keyboard(replyKeyboard).resize());
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
      throw new Error(error.message);
    }
  }

  @Command(BOT_COMMAND_NAME.RECIPES)
  async onRecipes(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.scene.enter(SCENE_ID.RECIPES);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
      throw new Error(error.message);
    }
  }

  @Command(BOT_COMMAND_NAME.TIPS)
  async onTips(@Ctx() ctx: SceneContext) {
    try {
      await ctx.scene.enter(SCENE_ID.TIPS);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
      throw new Error(error.message);
    }
  }

  @Command(BOT_COMMAND_NAME.SKIN_TYPE_TEST)
  async onSkinTypeTest(@Ctx() ctx: SceneContext) {
    try {
      await ctx.scene.enter(SCENE_ID.SKIN_TYPE_TEST);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
      throw new Error(error.message);
    }
  }

  @Command(BOT_COMMAND_NAME.SETTINGS)
  async onSettings(@Ctx() ctx: Context) {
    try {
      await ctx.reply('Settings');
      this.logger.info('Settings command executed');
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
      throw new Error(error.message);
    }
  }

  @Command(BOT_COMMAND_NAME.STATS)
  async onStats(@Ctx() ctx: Context) {
    try {
      await ctx.reply('Stats');
      this.logger.info('Stats command executed');
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
      throw new Error(error.message);
    }
  }
}
