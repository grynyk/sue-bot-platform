import { Action, Ctx, InjectBot, Scene } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { getAnswer, getQuestion, getResultProductSizeCaption, getResultProductCaption } from './utils/skin-type-test.utils';
import { get, isNil } from 'lodash-es';
import { SkincareProduct, TestAnswer, TestQuestion, TestResult } from './models/skin-type-test.model';
import { getQuestionKeyboard, getResultProductSizeKeyboard, getResultProductKeyboard } from './utils/keyboard.factory';
import { SceneNavigation, SceneStateService } from '../../shared/scene-navigation';
import { RESULTS, SKINCARE } from './constants';
import { Message } from '@telegraf/types';
import { SCENE_ID, SceneContext, NAVIGATION_CALLBACK, PARSE_MODE, DeleteAndReplyOptions } from '../../models';
import { isBotCommand, backButtonKeyboard, deleteAndReply } from '../../utils';
import { BotUserDataService, PRODUCT_SIZE } from '@sue-bot-platform/api';

@Scene(SCENE_ID.SKIN_TYPE_TEST)
export class SkinTypeTestScene extends SceneNavigation {
  constructor(
    @InjectBot() protected readonly bot: Telegraf,
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    protected readonly stateService: SceneStateService,
    private readonly botUserDataService: BotUserDataService
  ) {
    super(bot, logger, stateService, SCENE_ID.SKIN_TYPE_TEST);
  }

  @Action(NAVIGATION_CALLBACK.START)
  async onStart(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await this.sendQuestion(ctx, 1);
    } catch (error) {
      this.logger.error(`${ctx.text} onStart(...): ${error.message}`);
    }
  }

  @Action(/RESULT_(MINI|MAXI)_(RECOMMENDATIONS|INGREDIENTS|ROUTINE)_(\d+)/)
  async handleResultDetails(ctx: SceneContext) {
    try {
      const productSize: PRODUCT_SIZE = PRODUCT_SIZE[ctx.match[1] as keyof typeof PRODUCT_SIZE];
      const detail: string = ctx.match[2];
      const answerId: number = parseInt(ctx.match[3]);
      this.stateService.storeCallback(`RESULT_${productSize}_${detail}_${answerId}`);
      const result: TestResult = RESULTS.find((result: TestResult): boolean => result.answerIds.includes(answerId));
      const product: SkincareProduct = result.products.find((product: SkincareProduct): boolean => product.size === productSize);
      const caption: string = product[detail.toLowerCase()];
      this.deleteAndReply(ctx, caption, backButtonKeyboard);
    } catch (error) {
      this.logger.error(`${ctx.text} handleResultDetails(...): ${error.message}`);
    }
  }

  @Action(/RESULT_(MINI|MAXI)_(\d+)/)
  async handleResult(ctx: SceneContext) {
    try {
      const productSize: PRODUCT_SIZE = PRODUCT_SIZE[ctx.match[1] as keyof typeof PRODUCT_SIZE];
      const answerId: number = parseInt(ctx.match[2]);
      this.stateService.storeCallback(`RESULT_${productSize}_${answerId}`);
      const result: TestResult = RESULTS.find((result: TestResult): boolean => result.answerIds.includes(answerId));
      const product: SkincareProduct = result.products.find((product: SkincareProduct): boolean => product.size === productSize);
      const keyboard: ReturnType<typeof Markup.inlineKeyboard> = getResultProductKeyboard(product, answerId, productSize);
      const caption: string = getResultProductCaption(result, product);
      this.deleteAndReply(ctx, caption, keyboard, { image: product.image });
      await this.botUserDataService.update(ctx.from.id, { skinType: result.title }); 
    } catch (error) {
      this.logger.error(`${ctx.text} handleResult(...): ${error.message}`);
    }
  }

  @Action(/ANSWER_(\d+)/)
  async processAnswer(ctx: SceneContext) {
    try {
      const answerId: number = parseInt(ctx.match[1]);
      this.stateService.storeCallback(`ANSWER_${answerId}`);
      const answer: TestAnswer = getAnswer(answerId);
      if (answer.next) {
        await this.sendQuestion(ctx, answer.next);
      } else {
        await this.sendResultProductSizes(ctx, answer);
      }
    } catch (error) {
      this.logger.error(`${ctx.text} processAnswer(...): ${error.message}`);
    }
  }

  private async sendQuestion(ctx: SceneContext, questionId: number): Promise<void> {
    try {
      const question: TestQuestion = getQuestion(questionId);
      if (isNil(question)) {
        await ctx.editMessageText(SKINCARE.LOCALIZATION_STRINGS.ERROR);
        return;
      }
      const keyboard: ReturnType<typeof Markup.inlineKeyboard> = getQuestionKeyboard(question);
      if (isBotCommand(ctx.text)) {
        this.deleteAndReply(ctx, question.text, keyboard, { deletePreviousMessage: false });
        return;
      }
      await ctx.editMessageText(question.text, keyboard);
    } catch (error) {
      this.logger.error(`${ctx.text} sendQuestion(...): ${error.message}`);
    }
  }

  private async sendResultProductSizes(ctx: SceneContext, answer: TestAnswer): Promise<void> {
    try {
      const result: TestResult = RESULTS.find((result: TestResult): boolean => result.answerIds.includes(answer.id));
      const caption: string = getResultProductSizeCaption(result.title);
      const keyboard: ReturnType<typeof Markup.inlineKeyboard> = getResultProductSizeKeyboard(answer);
      const isNavigationBack: boolean = get(ctx.update, 'navigationBack');
      if (isNavigationBack) {
        this.deleteAndReply(ctx, caption, keyboard);
      } else {
        await ctx.editMessageText(caption, {
          parse_mode: PARSE_MODE.HTML,
          ...keyboard,
        });
      }
    } catch (error) {
      this.logger.error(`${ctx.text} sendResultProductSizes(...): ${error.message}`);
    }
  }

  private async deleteAndReply(
    ctx: SceneContext,
    caption: string,
    keyboard: ReturnType<typeof Markup.inlineKeyboard>,
    options: DeleteAndReplyOptions = {}
  ): Promise<void> {
    try {
      const message: Message = await deleteAndReply(ctx, caption, keyboard, options);
      this.stateService.setMessageId(message.message_id);
    } catch (error) {
      this.logger.error(`${ctx.text} deleteAndReply(...): ${error.message}`);
    }
  }
}
