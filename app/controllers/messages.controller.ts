import { isNil } from 'lodash';
import { BotMessage, MessagesDatabaseMiddleware } from '../middlewares';
import { MessagesControllerModel } from '../models';
import got from 'got';
import { BOT_URL } from '../shared/api-path';

export const MessagesController: MessagesControllerModel = {
  async deleteAll(botToken: string): Promise<void> {
    try {
      const messages: BotMessage[] = await MessagesDatabaseMiddleware.getAll();
      if (isNil(messages) || messages.length === 0) {
        return;
      }
      messages.forEach((message: BotMessage): void => {
        (() => {
          setTimeout(() => {
            const baseUrl: string = `${BOT_URL.TELEGRAM_API}${botToken}`;
            (async () => {
              await got
                .post(`${baseUrl}/deleteMessage`, {
                  json: {
                    chat_id: message.chatId,
                    message_id: message.id,
                  },
                })
                .json();
            })();
          }, 400);
        })();
      });
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
};
