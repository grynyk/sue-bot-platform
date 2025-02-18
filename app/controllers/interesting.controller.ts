import { isNil } from 'lodash';
import { Context } from 'telegraf/typings/context';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import {
  NAVIGATION_ICON,
  MARKUP_DIRECTION,
  NAVIGATION_CALLBACK,
  MESSAGE_DELIVERY_TYPE,
  PARSE_MODE,
} from '../shared/enums';
import {
  interestingAffirmationsMarkups,
  interestingMarkup,
} from '../shared/markups';
import { InterestingControllerModel } from '../models';
import { DataUtils, KeyboardMarkupUtils, TgUtils } from '../shared/utils';
import { StaticDataItem } from '../static/models';
import { interestingData } from '../static/data';

export const InterestingController: InterestingControllerModel = {
  async callbacksHandler(ctx: Context, callback: string): Promise<void> {
    try {
      if (
        callback === NAVIGATION_CALLBACK.INTERESTING_DYNAMIC_BACK ||
        callback === NAVIGATION_CALLBACK.INTERESTING_MUSIC_BACK ||
        callback === NAVIGATION_CALLBACK.INTERESTING_BACK
      ) {
        let targetMarkup: Array<InlineKeyboardButton[]>;
        let caption: string;
        if (callback === NAVIGATION_CALLBACK.INTERESTING_BACK) {
          caption = 'Корисна інформація:';
          targetMarkup = interestingMarkup;
        } else {
          caption = callback.includes('dynamic')
            ? 'Динамічні афірмації:'
            : 'Музичні афірмації:';
          targetMarkup = callback.includes('dynamic')
            ? interestingAffirmationsMarkups.INTERESTING_DYNAMIC_AFFIRMATIONS
            : interestingAffirmationsMarkups.INTERESTING_MUSIC_AFFIRMATIONS;
        }
        await TgUtils.deliverMessage(
          ctx,
          MESSAGE_DELIVERY_TYPE.EDIT_PREVIOUS,
          caption,
          {
            markup: targetMarkup,
          }
        );
        return;
      }
      interestingData.data.forEach(
        async (item: StaticDataItem): Promise<void> => {
          if (!DataUtils.equalOrHas(item.callbackData, callback)) {
            return;
          }
          ctx.deleteMessage();
          let markup: Array<InlineKeyboardButton[]>;
          let caption: string;
          const backBtnCallback: string =
            callback.includes('dynamic') || callback.includes('music')
              ? callback.includes('dynamic')
                ? NAVIGATION_CALLBACK.INTERESTING_DYNAMIC_BACK
                : NAVIGATION_CALLBACK.INTERESTING_MUSIC_BACK
              : NAVIGATION_CALLBACK.INTERESTING_BACK;
          if (typeof item?.getMarkupTargetKey === 'function') {
            const targetKey: string = item?.getMarkupTargetKey().toUpperCase();
            if (isNil(targetKey)) {
              return;
            }
            markup = interestingAffirmationsMarkups[targetKey];
            caption = targetKey.includes('DYNAMIC')
              ? 'Динамічні афірмації:'
              : 'Музичні афірмації:';
          } else {
            markup = KeyboardMarkupUtils.createButtons(
              [
                {
                  text: NAVIGATION_ICON.BACK,
                  callback_data: backBtnCallback,
                },
              ],
              MARKUP_DIRECTION.HORIZONTAL
            );
            caption = item.response;
          }
          await TgUtils.deliverMessage(
            ctx,
            MESSAGE_DELIVERY_TYPE.SEND_NEW,
            caption,
            {
              parseMode: PARSE_MODE.HTML,
              markup,
            }
          );
        }
      );
    } catch (error: unknown) {
      throw new Error(`${error}`);
    }
  },
};
