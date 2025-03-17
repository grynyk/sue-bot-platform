import { Telegraf } from 'telegraf';
import { Action, Ctx, InjectBot, SceneEnter, SceneLeave } from 'nestjs-telegraf';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { SceneStateService } from './services';
import { SceneStateItem } from './models';
import { NAVIGATION_CALLBACK } from '@models/navigation.model';
import { SCENE_ID, SceneContext } from '@models/scenes.model';
import { triggerCallback } from '@utils/callback.utils';

export abstract class SceneNavigation {
  constructor(
    @InjectBot() protected readonly bot: Telegraf,
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    protected readonly stateService: SceneStateService,
    protected readonly sceneId: SCENE_ID
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext): Promise<void> {
    this.stateService.setContext(ctx, this.sceneId);
    this.onStart(ctx);
  }

  @Action(NAVIGATION_CALLBACK.START)
  async onStart(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      throw new Error(`onStart(...): is method not implemented.`);
    } catch (error) {
      this.logger.error(`${ctx.text} - ${error.message}`);
    }
  }

  @Action(NAVIGATION_CALLBACK.CLOSE)
  async onClose(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.answerCbQuery();
      ctx.scene.leave();
    } catch (error) {
      this.logger.error(`${ctx.text} - onClose(...): ${error.message}`);
    }
  }

  @Action(NAVIGATION_CALLBACK.BACK)
  async onBack(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      const callbackData: string = this.stateService.getPreviousCallback();
      await ctx.answerCbQuery();
      await triggerCallback(this.bot, ctx, callbackData);
    } catch (error) {
      this.logger.error(`${ctx.text} - onBack(...): ${error.message}`);
    }
  }

  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      const sceneData: SceneStateItem = this.stateService.getSceneData();
      if (sceneData && ctx.scene.current?.id === this.sceneId) {
        const messageId: number = this.stateService.getMessageId();
        if (messageId) {
          await ctx.telegram.deleteMessage(ctx.chat.id, messageId);
        }
      }
      this.stateService.resetScene();
    } catch (error) {
      this.logger.error(`${ctx.text} - onSceneLeave(...): ${error.message}`);
    }
  }
}
