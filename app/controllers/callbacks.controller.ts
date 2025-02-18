import Context from 'telegraf/typings/context';
import { Telegraf } from 'telegraf/typings/telegraf';
import {
  MARKUP_DIRECTION,
  MESSAGE_DELIVERY_TYPE,
  NAVIGATION_CALLBACK,
  PARSE_MODE,
} from '../shared/enums';
import { CallbacksControllerModel } from '../models';
import { DataUtils, KeyboardMarkupUtils, TgUtils } from '../shared/utils';
import { InterestingController } from './interesting.controller';
import { NotificationsController } from './notifications.controller';
import { RecipesController } from './recipes.controller';
import { SkinTestController } from './skin-test.controller';
import { UsersDatabaseMiddleware } from '../middlewares';
import { isNil } from 'lodash';
import moment from 'moment';
import { commandsMarkup } from '../shared/markups';
import {
  interestingData,
  notificationsTimeData,
  recipesData,
  skinTestCallbacksData,
} from '../static/data';

export const CallbacksController: CallbacksControllerModel = {
  listenToKeyboardCallback(bot: Telegraf, callback: string): void {
    try {
      bot.action(callback, async (ctx: Context): Promise<boolean> => {
        let callbackQuery: string;
        const isStartBtnCallback: boolean =
          callback === NAVIGATION_CALLBACK.BOT_START;
        const isSkinTestBtnCallback: boolean =
          DataUtils.getAllStaticDataCallbacks(skinTestCallbacksData).includes(
            callback
          );
        const isRecipesBtnCallback: boolean =
          DataUtils.getAllStaticDataCallbacks(recipesData).includes(callback);
        const isInterestingBtnCallback: boolean =
          DataUtils.getAllStaticDataCallbacks(interestingData).includes(
            callback
          );
        const isNotificationsManagerBtnCallback: boolean =
          DataUtils.getAllStaticDataCallbacks(notificationsTimeData).includes(
            callback
          );

        if (isStartBtnCallback) {
          await TgUtils.deliverMessage(
            ctx,
            MESSAGE_DELIVERY_TYPE.EDIT_PREVIOUS,
            `${
              ctx.from.first_name ? 'Привіт' : ctx.from.first_name
            }, я бот Sue і я буду про тебе піклуватись 😊`
          );
          ctx.reply(
            'Я буду надсилати тобі сповіщення протягом дня\n\nКерувати сповіщеннями можна за допомогою команди /notifications_manager'
          );
          setTimeout(() => {
            ctx.reply('Давай розпочнемо зі склянки води 💧');
          }, 2000);
          setTimeout(() => {
            TgUtils.deliverMessage(
              ctx,
              MESSAGE_DELIVERY_TYPE.SEND_NEW,
              'Випий 200мл води',
              {
                markup: KeyboardMarkupUtils.createButtons(
                  [
                    {
                      text: 'Зроблено 💧',
                      callback_data: NAVIGATION_CALLBACK.BOT_START,
                    },
                  ],
                  MARKUP_DIRECTION.HORIZONTAL
                ),
              }
            );
          }, 2700);
          setTimeout(() => {
            ctx.telegram.sendMessage(ctx.chat.id, `Доступні команди:`, {
              reply_markup: {
                keyboard: commandsMarkup,
                one_time_keyboard: true,
                resize_keyboard: true,
                selective: true,
              },
            });
          }, 4000);
          callbackQuery = 'Розпочинаймо!';
        } else if (callback === NAVIGATION_CALLBACK.BOT_START) {
          const wasMessageSentToday: boolean = moment(
            moment.unix(ctx.update[`callback_query`].message.date)
          ).isSame(new Date(), 'day');
          if (wasMessageSentToday) {
            const editedMessage: string = isNil(
              ctx.update[`callback_query`].message?.text
            )
              ? `✓ Зроблено`
              : `✓ ${ctx.update[`callback_query`].message?.text}`;
            await TgUtils.deliverMessage(
              ctx,
              MESSAGE_DELIVERY_TYPE.EDIT_PREVIOUS,
              editedMessage,
              {
                parseMode: PARSE_MODE.HTML,
              }
            );
            await UsersDatabaseMiddleware.incrementDoneTasksCounterByUserId(
              String(ctx.from.id)
            );
            callbackQuery = 'Молодець!';
          } else {
            callbackQuery = 'Cповіщення занадто давнє для підтвердження :(';
          }
        } else if (isSkinTestBtnCallback) {
          await SkinTestController.callbacksHandler(ctx, callback);
        } else if (isRecipesBtnCallback) {
          await RecipesController.callbacksHandler(ctx, callback);
        } else if (isInterestingBtnCallback) {
          await InterestingController.callbacksHandler(ctx, callback);
        } else if (isNotificationsManagerBtnCallback) {
          await NotificationsController.callbacksHandler(ctx, callback);
        }
        return ctx.answerCbQuery(callbackQuery ?? 'Завантаження...');
      });
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
};
