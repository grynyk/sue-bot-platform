import { Action, Ctx, InjectBot, Scene } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Message } from '@telegraf/types';
import { SceneNavigation, SceneStateService } from '@shared/scene-navigation';
import { NAVIGATION_CALLBACK } from '@models/navigation.model';
import { SCENE_ID, SceneContext } from '@models/scenes.model';
import { isBotCommand } from '@utils/command.utils';
import { BotUserDataService } from '@modules/bot-user-data';

@Scene(SCENE_ID.SETTINGS)
export class SettingsScene extends SceneNavigation {
  constructor(
    @InjectBot() protected readonly bot: Telegraf,
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    protected readonly stateService: SceneStateService,
    private readonly botUserDataService: BotUserDataService
  ) {
    super(bot, logger, stateService, SCENE_ID.SETTINGS);
  }

  @Action(NAVIGATION_CALLBACK.START)
  async onStart(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      if (isBotCommand(ctx.text)) {
        const message: Message.TextMessage = await ctx.reply('Налаштування:');
        this.stateService.setMessageId(message.message_id);
      } else {
        await ctx.answerCbQuery();
        await ctx.editMessageText('Налаштування:');
      }
    } catch (error) {
      this.logger.error(`${ctx.text} onStart: ${error.message}`);
    }
  }
}
