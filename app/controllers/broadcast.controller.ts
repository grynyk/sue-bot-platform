import {
  MessagesDatabaseMiddleware,
  UsersDatabaseMiddleware,
} from '../middlewares';
import { DataUtils, KeyboardMarkupUtils, TgUtils } from '../shared/utils';
import { isNil } from 'lodash';
import {
  NotificationMessage,
  TgMessageHttpResponse,
  BroadcastControllerModel,
  SendMessageOptions,
  TgHttpError,
} from '../models';
import { Moment } from 'moment';
import { NotificationsController } from './notifications.controller';
import { BotUser } from '../middlewares/database/models/users.model';
import { MARKUP_DIRECTION } from '../shared/enums';
import { BOT_URL } from '../shared/api-path';

export const BroadcastController: BroadcastControllerModel = {
  async sendMessageToUser(
    userId: string | number,
    messageOptions: Partial<SendMessageOptions>,
    botToken: string
  ): Promise<TgMessageHttpResponse> {
    try {
      if (isNil(messageOptions) || isNil(messageOptions.caption)) {
        return;
      }
      const baseUrl: string = `${BOT_URL.TELEGRAM_API}${botToken}`;
      return await TgUtils.sendMessageByUrl(
        baseUrl,
        String(userId),
        messageOptions
      );
    } catch (e: unknown) {
      throw e['response'];
    }
  },
  async sendScheduledNotificationToAllUsers(
    currentTimestamp: Moment,
    botToken: string
  ): Promise<void> {
    try {
      const users: BotUser[] = await UsersDatabaseMiddleware.getAll();
      if (isNil(users)) {
        return;
      }
      users.forEach((user: BotUser): void => {
        (() => {
          setTimeout(() => {
            if (!user.notificationsEnabled) {
              return;
            }
            const notification: Partial<NotificationMessage> =
              NotificationsController.getScheduledNotification(
                currentTimestamp,
                user
              );
            if (isNil(notification) || isNil(notification.text)) {
              return;
            }
            const mappedMessageOptions: SendMessageOptions =
              mapNotificationToMessageOptions(notification);
            (async () => {
              const responseResult: TgMessageHttpResponse =
                await this.sendMessageToUser(
                  user.id,
                  mappedMessageOptions,
                  botToken
                ).catch((e: TgHttpError) => {
                  if (e.statusCode === 403) {
                    // TODO: Error Handling
                    throw new Error(`${e}`);
                  }
                });
              if (responseResult?.ok) {
                await MessagesDatabaseMiddleware.insert(
                  responseResult.result
                ).catch((e: TgHttpError) => {
                  if (e.statusCode === 403) {
                    // TODO: Error Handling
                    throw new Error(`${e}`);
                  }
                });
              }
            })();
            if (notification.time === 10000) {
              (async () => {
                let emoji = '';
                switch (user.doneTasksCounter) {
                  case 0:
                    emoji = '😭';
                    break;
                  case 1:
                  case 2:
                    emoji = '😟';
                    break;
                  case 3:
                  case 4:
                    emoji = '😑';
                    break;
                  case 5:
                  case 6:
                    emoji = '😊';
                    break;
                  case 7:
                    emoji = '🥰';
                    break;
                  default:
                    emoji = '🙂';
                    break;
                }
                const message: SendMessageOptions = {
                  caption: `Ви виконали ${user.doneTasksCounter} з 7 завдань сьогодні ${emoji}`,
                };
                await this.sendMessageToUser(user.id, message, botToken).catch(
                  (e: TgHttpError) => {
                    // TODO: Error Handling
                    throw new Error(`${e}`);
                  }
                );
              })();
            }
          }, 250);
        })();
      });
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async sendToAllUsers(
    botToken: string,
    messageOptions: SendMessageOptions
  ): Promise<void> {
    try {
      const users: BotUser[] = await UsersDatabaseMiddleware.getAll();
      if (isNil(users)) {
        return;
      }
      users.forEach((user: BotUser): void => {
        (() => {
          setTimeout(() => {
            (async () => {
              await this.sendMessageToUser(
                user.id,
                messageOptions,
                botToken
              ).catch((e: TgHttpError): void => {
                if (e.statusCode === 403) {
                  // TODO: Error Handling
                  throw new Error(`${e}`);
                }
              });
            })();
          }, 250);
        })();
      });
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
};

function mapNotificationToMessageOptions(
  notification: Partial<NotificationMessage>,
  options: { markupDirection: MARKUP_DIRECTION } = null
): SendMessageOptions {
  const messageText: string = Array.isArray(notification.text)
    ? DataUtils.getRandomItemFromArray<string>(...notification.text)
    : notification.text;
  return {
    ...(messageText && { caption: messageText }),
    ...(notification.image && { image: notification.image }),
    ...(notification.reply_btn && {
      markup: KeyboardMarkupUtils.createButtons(
        notification.reply_btn,
        options?.markupDirection || MARKUP_DIRECTION.VERTICAL
      ),
    }),
  };
}
