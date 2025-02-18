import { isNil } from 'lodash';
import Context from 'telegraf/typings/context';
import { MESSAGE_DELIVERY_TYPE, NAVIGATION_CALLBACK } from '../shared/enums';
import { notificationsManagerMarkup } from '../shared/markups';
import { BotUser, UsersDatabaseMiddleware } from '../middlewares';
import { NotificationMessage, NotificationsControllerModel } from '../models';
import {
  notificationsTimeData,
  scheduledNotificationsData,
} from '../static/data';
import { DataUtils, TgUtils, FormatUtils } from '../shared/utils';
import { CommandsController } from './commands.controller';
import moment, { Moment } from 'moment';

const isSpecificDay = (dayIndex: number | string): boolean =>
  String(moment().weekday()) === String(dayIndex);

export const NotificationsController: NotificationsControllerModel = {
  getScheduledNotification(
    currentTimestamp: Moment,
    user: BotUser
  ): NotificationMessage {
    if (isNil(user)) {
      return;
    }
    const wakeUpTimestamp: Moment =
      FormatUtils.convertTimeToTodaysDateTimestamp(
        user.wakeUpTime,
        currentTimestamp,
        'moment'
      );
    const bedTimestamp: Moment = FormatUtils.convertTimeToTodaysDateTimestamp(
      user.bedTime,
      currentTimestamp,
      'moment'
    );
    const notification: NotificationMessage = scheduledNotificationsData.find(
      (item: NotificationMessage): boolean => {
        const notificationTime: Moment =
          item.time >= 0 ? wakeUpTimestamp : bedTimestamp;
        const targetTimestamp: Moment = notificationTime
          .clone()
          .add(Number(item.time), 'minutes');
        const isTimeInSetDelayRange: boolean =
          FormatUtils.isTimeInSetDelayRange(
            targetTimestamp.clone(),
            currentTimestamp.clone()
          );
        return (
          (isNil(item.week_day) || isSpecificDay(item.week_day)) &&
          isTimeInSetDelayRange
        );
      }
    );
    if (FormatUtils.isTimeInSetDelayRange(bedTimestamp, currentTimestamp)) {
      return scheduledNotificationsData.find(
        (item: NotificationMessage): boolean => item.time === 10000
      );
    }
    if (FormatUtils.isTimeInSetDelayRange(wakeUpTimestamp, currentTimestamp)) {
      return scheduledNotificationsData.find(
        (item: NotificationMessage): boolean => item.time === 0
      );
    }
    return notification;
  },
  async callbacksHandler(ctx: Context, callback: string): Promise<void> {
    try {
      for (const item of notificationsTimeData.data) {
        if (!DataUtils.equalOrHas(item.callbackData, callback)) {
          continue;
        }
        const isTimeCallback: boolean = !isNaN(Number(callback.slice(-1)));
        const isSwitchNotificationsCallback: boolean =
          callback.includes('enable') || callback.includes('disable');
        if (isSwitchNotificationsCallback) {
          const isEnabled: boolean = callback.includes('enable');
          await UsersDatabaseMiddleware.updateNotificationsFlagByUserId(
            isEnabled,
            String(ctx.from.id)
          );
          await ctx.deleteMessage();
          await TgUtils.deliverMessage(
            ctx,
            MESSAGE_DELIVERY_TYPE.SEND_NEW,
            `Сповіщення ${isEnabled ? 'увімкнено' : 'вимкнено'}`
          );
        } else if (isTimeCallback) {
          const selectedTime: string = callback.slice(-5).replace('_', ':');
          const isWakeUpTime: boolean = callback.includes('wake_up');
          if (isWakeUpTime) {
            await UsersDatabaseMiddleware.updateNotificationsWakeUpTimeByUserId(
              selectedTime,
              String(ctx.from.id)
            );
          } else {
            await UsersDatabaseMiddleware.updateNotificationsBedTimeByUserId(
              selectedTime,
              String(ctx.from.id)
            );
          }
          await ctx.deleteMessage();
          await TgUtils.deliverMessage(
            ctx,
            MESSAGE_DELIVERY_TYPE.SEND_NEW,
            `Час ${
              isWakeUpTime ? 'прокидання' : 'сну'
            } встановлено на ${selectedTime}`
          );
        } else {
          if (callback === NAVIGATION_CALLBACK.NOTIFICATIONS_BACK) {
            await ctx.deleteMessage();
            await CommandsController.notificationsManager(ctx);
          } else if (typeof item?.getMarkupTargetKey === 'function') {
            const targetKey: string = item?.getMarkupTargetKey();
            const { caption, inline_keyboard } = targetKey.includes('wake_up')
              ? {
                  caption: 'Виберіть час прокидання:',
                  inline_keyboard: notificationsManagerMarkup.wake_up_time,
                }
              : {
                  caption: 'Виберіть час сну:',
                  inline_keyboard: notificationsManagerMarkup.bed_time,
                };
            await TgUtils.deliverMessage(
              ctx,
              MESSAGE_DELIVERY_TYPE.EDIT_PREVIOUS,
              caption,
              {
                markup: inline_keyboard,
              }
            );
          }
        }
      }
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
};
