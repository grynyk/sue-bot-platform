import { Action, Ctx, InjectBot, Scene } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { InlineKeyboardMarkup } from 'typegram';
import { get } from 'lodash';
import { TipsSceneContextType } from './models/tips.model';
import { TIPS } from './constants/tips.constant';
import { getTipsDynamicAffirmationKeyboard, getTipsInitialKeyboard, getTipsMusicAffirmationKeyboard } from './utils/keyboard.factory';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Message } from '@telegraf/types';
import { SceneNavigation, SceneStateService } from '../../shared/scene-navigation';
import { SCENE_ID, SceneContext, PARSE_MODE, NAVIGATION_CALLBACK } from '../../models';
import { isBotCommand, backButtonKeyboard } from '../../utils';

@Scene(SCENE_ID.TIPS)
export class TipsScene extends SceneNavigation {
  constructor(
    @InjectBot() protected readonly bot: Telegraf,
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    protected readonly stateService: SceneStateService
  ) {
    super(bot, logger, stateService, SCENE_ID.TIPS);
  }

  @Action(NAVIGATION_CALLBACK.START)
  async onStart(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      const keyboard: Markup.Markup<InlineKeyboardMarkup> = getTipsInitialKeyboard();
      if (isBotCommand(ctx.text)) {
        const message: Message.TextMessage = await ctx.reply('Корисна інформація:', keyboard);
        this.stateService.setMessageId(message.message_id);
      } else {
        await ctx.answerCbQuery();
        await ctx.editMessageText('Корисна інформація:', keyboard);
      }
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  @Action(/^TIPS_MAIN_/)
  async onTipCallback(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.answerCbQuery();
      const callbackData: TipsSceneContextType = get(ctx.callbackQuery, 'data') as TipsSceneContextType;
      this.stateService.storeCallback(callbackData);
      if (callbackData === TIPS.CALLBACKS.MAIN.DYNAMIC_AFFIRMATIONS) {
        this.onDynamicAffirmations(ctx);
        return;
      }
      if (callbackData === TIPS.CALLBACKS.MAIN.MUSIC_AFFIRMATIONS) {
        this.onMusicAffirmations(ctx);
        return;
      }
      await ctx.editMessageText(TIPS.RESPONSES.MAIN[callbackData], {
        parse_mode: PARSE_MODE.MARKDOWN_V2,
        ...backButtonKeyboard,
      });
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  @Action(/^TIPS_DYNAMIC_AFFIRMATION_/)
  async onDynamicAffirmationCallback(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.answerCbQuery();
      const callbackData: TipsSceneContextType = get(ctx.callbackQuery, 'data') as TipsSceneContextType;
      this.stateService.storeCallback(callbackData);
      await ctx.editMessageText(TIPS.RESPONSES.DYNAMIC_AFFIRMATION[callbackData], {
        parse_mode: PARSE_MODE.HTML,
        ...backButtonKeyboard,
      });
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  @Action(/^TIPS_MUSIC_AFFIRMATION_/)
  async onMusicAffirmationCallback(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.answerCbQuery();
      const callbackData: TipsSceneContextType = get(ctx.callbackQuery, 'data') as TipsSceneContextType;
      this.stateService.storeCallback(callbackData);
      await ctx.editMessageText(TIPS.RESPONSES.MUSIC_AFFIRMATION[callbackData], {
        parse_mode: PARSE_MODE.HTML,
        ...backButtonKeyboard,
      });
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  private async onDynamicAffirmations(ctx: SceneContext) {
    try {
      const buttons: Markup.Markup<InlineKeyboardMarkup> = getTipsDynamicAffirmationKeyboard();
      await ctx.editMessageText('Динамічні афірмації:', buttons);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  private async onMusicAffirmations(ctx: SceneContext) {
    try {
      const buttons: Markup.Markup<InlineKeyboardMarkup> = getTipsMusicAffirmationKeyboard();
      await ctx.editMessageText('Музичні афірмації:', buttons);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }
}
