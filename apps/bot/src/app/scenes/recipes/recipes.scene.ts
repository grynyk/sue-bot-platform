import { Action, Ctx, InjectBot, Scene } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { InlineKeyboardMarkup } from 'typegram';
import { get } from 'lodash';
import { RecipesSceneContextType } from './models/recipes.model';
import { getRecipesInitialKeyboard } from './utils/keyboard.factory';
import { RECIPES } from './constants/recipes.constant';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Message } from '@telegraf/types';
import { SceneNavigation, SceneStateService } from '../../shared';
import { NAVIGATION_CALLBACK, SCENE_ID, SceneContext } from '../../models';
import { isBotCommand, backButtonKeyboard } from '../../utils';

@Scene(SCENE_ID.RECIPES)
export class RecipesScene extends SceneNavigation {
  constructor(
    @InjectBot() protected readonly bot: Telegraf,
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    protected readonly stateService: SceneStateService
  ) {
    super(bot, logger, stateService, SCENE_ID.RECIPES);
  }

  @Action(NAVIGATION_CALLBACK.START)
  async onStart(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      const keyboard: Markup.Markup<InlineKeyboardMarkup> = getRecipesInitialKeyboard();
      if (isBotCommand(ctx.text)) {
        const message: Message.TextMessage = await ctx.reply('Рецепти:', keyboard);
        this.stateService.setMessageId(message.message_id);
      } else {
        await ctx.answerCbQuery();
        await ctx.editMessageText('Рецепти:', keyboard);
      }
    } catch (error) {
      this.logger.error(`${ctx.text} onStart: ${error.message}`);
    }
  }

  @Action(/^RECIPES_/)
  async onRecipe(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.answerCbQuery();
      const callbackData: RecipesSceneContextType = get(ctx.callbackQuery, 'data') as RecipesSceneContextType;
      this.stateService.storeCallback(callbackData);
      await ctx.editMessageText(
        RECIPES.RESPONSES.MAIN[callbackData],
        backButtonKeyboard
      );
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }
}
