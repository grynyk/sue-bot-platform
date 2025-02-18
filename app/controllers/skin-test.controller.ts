import { isNil } from 'lodash';
import Context from 'telegraf/typings/context';
import { Message } from 'typegram';
import {
  ComplexSizeEnum,
  MESSAGE_DELIVERY_TYPE,
  PARSE_MODE,
  SkinTestEnums,
  SkinTestResultInfoKeys,
  SkinTestResultTitles,
} from '../shared/enums';
import { skinTestDynamicMarkup } from '../shared/markups';
import { UsersDatabaseMiddleware } from '../middlewares';
import {
  ComplexSizes,
  SkinTestControllerModel,
  SkinTestDataItem,
  SkinTestResultData,
} from '../models';
import { skinTestState } from '../shared/state';
import {
  currentSeasonComplex,
  getAllSkinTestComplexSizeCallbacks,
  getAllSkinTestCompositionCallbacks,
  getAllSkinTestRecommendationsCallbacks,
  getAllSkinTestResultCallbacks,
  getAllSkinTestUsageCallbacks,
  skinTestCallbacksData,
  skinTestData,
} from '../static/data';
import { DataUtils, TgUtils, SkinTestUtils } from '../shared/utils';
import { StaticDataItem } from '../static/models';

export const SkinTestController: SkinTestControllerModel = {
  getSkinTestResult(callback: string): SkinTestDataItem {
    return skinTestData.find((item: SkinTestDataItem): boolean =>
      item.callbackData.includes(callback)
    );
  },
  getSkinTestResultInfo(
    callback: string,
    key: SkinTestResultInfoKeys
  ): SkinTestResultData {
    if (isNil(callback) || isNil(key)) {
      return;
    }
    const targetComplexSizeName: ComplexSizeEnum = callback.includes('maxi')
      ? ComplexSizeEnum.maxi
      : ComplexSizeEnum.mini;
    const preparedCallback: string =
      modifiedCallbackToSkinTestPureResultCallback(callback);
    const { url, text } = getComplexProps(
      preparedCallback,
      targetComplexSizeName,
      key
    );
    return { url, text };
  },
  async sendComplexSizeQuestion(ctx: Context, callback: string): Promise<void> {
    try {
      const skinTestResult: SkinTestDataItem = this.getSkinTestResult(callback);
      await ctx.telegram.sendMessage(
        ctx.chat.id,
        `Вітаємо, красуне! Твій шкіри визначено: в тебе \n<strong>${skinTestResult.title}</strong>.\n\nМи  підготували для тебе два комплекси:\nміні (малі об'єми засобів) та максі (великі об'єми).\nОбирай свій :)`,
        {
          parse_mode: PARSE_MODE.HTML,
          reply_markup: {
            inline_keyboard: skinTestDynamicMarkup.COMPLEX_SIZE(callback),
          },
        }
      );
    } catch (error: unknown) {
      throw new Error(`${error}`);
    }
  },
  async sendSkinTestResultLinks(ctx: Context, callback: string): Promise<void> {
    try {
      if (isNil(callback)) {
        return;
      }
      const targetComplexSizeName: ComplexSizeEnum = callback.includes('maxi')
        ? ComplexSizeEnum.maxi
        : ComplexSizeEnum.mini;
      const preparedCallback: string =
        modifiedCallbackToSkinTestPureResultCallback(callback);
      const { url, image, title } = getComplexProps(
        preparedCallback,
        targetComplexSizeName
      );
      await ctx.telegram.sendPhoto(ctx.chat.id, image, {
        caption: `<strong>${title}</strong>\nКомплекс <a href='${url}'><strong>${targetComplexSizeName}</strong></a> 💫`,
        parse_mode: PARSE_MODE.HTML,
        reply_markup: {
          inline_keyboard: skinTestDynamicMarkup.RESULT_LINKS(callback, url),
        },
      });
      Object.entries(SkinTestResultTitles).forEach(([key, value]): void => {
        if (!preparedCallback.includes(key)) {
          return;
        }
        UsersDatabaseMiddleware.updateSkinTypeByUserId(
          String(value),
          String(ctx.chat.id)
        );
      });
    } catch (error: unknown) {
      throw new Error(`${error}`);
    }
  },
  async sendSkinTestResultInfo(
    ctx: Context,
    resultData: SkinTestResultData,
    isBuyButton: boolean = false
  ): Promise<void> {
    try {
      if (isNil(resultData)) {
        return;
      }
      if (
        !isNil(skinTestState.getRecentResultMessage()) &&
        isInfoCallbackInState()
      ) {
        await ctx.telegram
          .deleteMessage(
            skinTestState.getRecentResultMessage().chatId,
            Number(skinTestState.getRecentResultMessage().message_id)
          )
          .catch(() => {
            skinTestState.clearRecentResultMessage();
          });
      }
      const sentMessagePromise: Message.TextMessage =
        await TgUtils.deliverMessage(
          ctx,
          MESSAGE_DELIVERY_TYPE.SEND_NEW,
          resultData.text,
          {
            parseMode: PARSE_MODE.HTML,
            showMarkup: isBuyButton,
            markup: skinTestDynamicMarkup.BUY_LINK(resultData.url),
          }
        );
      skinTestState.setRecentResultMessage({
        message_id: String(sentMessagePromise?.message_id),
        recentMessageText: sentMessagePromise?.text,
        chatId: String(sentMessagePromise?.chat?.id),
      });
    } catch (error: unknown) {
      throw new Error(`${error}`);
    }
  },
  async sendNextQuestion(
    ctx: Context,
    item: StaticDataItem,
    callback: string
  ): Promise<void> {
    try {
      const targetKey: string = item
        ?.getMarkupTargetKey(callback)
        .toUpperCase();
      if (isNil(targetKey)) {
        return;
      }
      const { caption, markup } =
        SkinTestUtils.getCaptionAndKeyboardMarkup(targetKey);
      skinTestState.addCallbackToPath(targetKey);
      await TgUtils.deliverMessage(
        ctx,
        MESSAGE_DELIVERY_TYPE.EDIT_PREVIOUS,
        caption,
        { markup }
      );
    } catch (error: unknown) {
      throw new Error(`${error}`);
    }
  },
  async sendPreviousQuestion(ctx: Context): Promise<void> {
    try {
      if (isNil(skinTestState.getCallbacksLastValue())) {
        ctx.deleteMessage();
        return;
      }
      let targetKey: string;
      const isCallbackComplexSizeMaxi: boolean = skinTestState
        .getCallbacksLastValue()
        .includes('_maxi');
      const isCallbackComplexSizeMini: boolean = skinTestState
        .getCallbacksLastValue()
        .includes('_mini');
      if (isCallbackComplexSizeMaxi || isCallbackComplexSizeMini) {
        const complexSizeSubstringLength = 5;
        targetKey = skinTestState
          .getCallbacksLastValue()
          .substring(
            0,
            skinTestState.getCallbacksLastValue().length -
              complexSizeSubstringLength
          );
        ctx.deleteMessage();
        this.sendComplexSizeQuestion(ctx, targetKey);
      } else {
        targetKey = skinTestState.getCallbackByIndex(
          skinTestState.getCallbacksPath().length - 2
        );
        const { caption, markup } =
          SkinTestUtils.getCaptionAndKeyboardMarkup(targetKey);
        await TgUtils.deliverMessage(
          ctx,
          MESSAGE_DELIVERY_TYPE.EDIT_PREVIOUS,
          caption,
          { markup }
        ).catch(() => {
          ctx.deleteMessage();
        });
      }
      skinTestState.setCallbacksPath([
        ...skinTestState.getCallbacksPath().slice(0, -1),
      ]);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async callbacksHandler(ctx: Context, callback: string): Promise<void> {
    try {
      for (const item of skinTestCallbacksData.data) {
        if (!DataUtils.equalOrHas(item.callbackData, callback)) {
          continue;
        }
        if (typeof item?.getMarkupTargetKey === 'function') {
          await this.sendNextQuestion(ctx, item, callback);
        } else if (callback === SkinTestEnums.BUTTONS.BACK) {
          await this.sendPreviousQuestion(ctx);
        } else if (getAllSkinTestResultCallbacks().includes(callback)) {
          await ctx.deleteMessage();
          skinTestState.addCallbackToPath(callback);
          await this.sendComplexSizeQuestion(ctx, callback);
        } else if (getAllSkinTestComplexSizeCallbacks().includes(callback)) {
          skinTestState.addCallbackToPath(callback);
          await this.sendSkinTestResultLinks(ctx, callback);
          await ctx.deleteMessage();
        } else if (getAllSkinTestCompositionCallbacks().includes(callback)) {
          await this.sendSkinTestResultInfo(
            ctx,
            this.getSkinTestResultInfo(
              callback,
              SkinTestResultInfoKeys.Composition
            ),
            true
          );
        } else if (getAllSkinTestUsageCallbacks().includes(callback)) {
          await this.sendSkinTestResultInfo(
            ctx,
            this.getSkinTestResultInfo(callback, SkinTestResultInfoKeys.Usage),
            true
          );
        } else if (
          getAllSkinTestRecommendationsCallbacks().includes(callback)
        ) {
          await this.sendSkinTestResultInfo(
            ctx,
            this.getSkinTestResultInfo(
              callback,
              SkinTestResultInfoKeys.Recommendations
            ),
            true
          );
        } else if (callback === SkinTestEnums.BUTTONS.CLOSE) {
          await ctx.deleteMessage();
        } else {
          await TgUtils.deliverMessage(
            ctx,
            MESSAGE_DELIVERY_TYPE.SEND_NEW,
            `Помилка в ${callback}`
          );
        }
      }
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
};

export function isInfoCallbackInState(): boolean {
  const isRecommendationsCallbackInState: boolean = skinTestState
    .getRecentResultMessage()
    .recentMessageText?.includes('Рекомендації');
  const isUsageCallbackInState: boolean = skinTestState
    .getRecentResultMessage()
    .recentMessageText?.includes('Схема догляду');
  const isCompositionCallbackInState: boolean = skinTestState
    .getRecentResultMessage()
    .recentMessageText?.includes('входить');
  const result: boolean =
    isRecommendationsCallbackInState ||
    isUsageCallbackInState ||
    isCompositionCallbackInState;
  return result;
}

export function getComplexProps(
  callback: string,
  size: string,
  textKey: string | null = null
): { url: string; text?: string; image?: string; title?: string } {
  const preparedTextKey: string = `${textKey}Text`;
  const complexSizes: ComplexSizes =
    SkinTestController.getSkinTestResult(callback)?.complexInfo;
  const { srcUrl, imageUrl } = complexSizes[size][currentSeasonComplex];
  const text: string =
    complexSizes[size][currentSeasonComplex][preparedTextKey];
  return {
    url: srcUrl,
    image: imageUrl,
    ...(!isNil(text) && { text }),
    title: SkinTestController.getSkinTestResult(callback)?.title,
  };
}

export function modifiedCallbackToSkinTestPureResultCallback(
  callback: string
): string {
  let result: string = callback;
  if (result.includes('maxi')) {
    result = result.replace('_maxi', '');
  } else if (result.includes('mini')) {
    result = result.replace('_mini', '');
  }
  if (result.includes('recommendations')) {
    result = result.replace('_recommendations', '');
  } else if (result.includes('usage')) {
    result = result.replace('_usage', '');
  } else if (result.includes('composition')) {
    result = result.replace('_composition', '');
  }
  return result;
}

export const skinTestHelperFns = {
  modifiedCallbackToSkinTestPureResultCallback,
  getComplexProps,
  isInfoCallbackInState,
};
