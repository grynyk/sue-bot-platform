import { isNil } from 'lodash';
import Context from 'telegraf/typings/context';
import { Message } from 'telegraf/typings/core/types/typegram';
import { MESSAGE_DELIVERY_TYPE, PARSE_MODE } from '../enums';
import { SendMessageOptions, TgMessageHttpResponse } from '../../models';
import got from 'got';
import { DataUtils } from './data.util';

export class TgUtils {
  public static async deliverMessage(
    ctx: Context,
    action: MESSAGE_DELIVERY_TYPE = MESSAGE_DELIVERY_TYPE.SEND_NEW,
    caption: string,
    options: SendMessageOptions = null
  ): Promise<Message.TextMessage> {
    options = DataUtils.fillDefaultOptions<SendMessageOptions>(options, {
      parseMode: PARSE_MODE.HTML,
      showMarkup: true,
    });
    const showMarkup: boolean = !isNil(options?.markup) && options?.showMarkup;
    if (action === MESSAGE_DELIVERY_TYPE.SEND_NEW) {
      const response: Message.TextMessage = await ctx.telegram.sendMessage(
        ctx.chat.id,
        caption,
        {
          parse_mode: options?.parseMode,
          ...(showMarkup && {
            reply_markup: {
              inline_keyboard: options.markup,
            },
          }),
        }
      );
      return response;
    } else {
      const messageId = isNil(options.editMessageId)
        ? ctx.update[`callback_query`].message.message_id
        : options.editMessageId;
      const response = (await ctx.telegram.editMessageText(
        ctx.chat.id,
        messageId,
        null,
        caption,
        {
          parse_mode: options.parseMode,
          ...(showMarkup && {
            reply_markup: {
              inline_keyboard: options.markup,
            },
          }),
        }
      )) as unknown as Promise<Message.TextMessage>;
      return response;
    }
  }

  public static sendMessageByUrl(
    baseUrl: string,
    userId: string,
    options: SendMessageOptions
  ): Promise<TgMessageHttpResponse> {
    options = DataUtils.fillDefaultOptions<SendMessageOptions>(options, {
      parseMode: PARSE_MODE.HTML,
      showMarkup: true,
    });
    const showMarkup: boolean = !isNil(options.markup) && options.showMarkup;
    return got
      .post(`${baseUrl}/${options.image ? 'sendPhoto' : 'sendMessage'}`, {
        json: {
          chat_id: userId,
          ...(options.image && {
            photo: String(options.image),
            caption: options.caption,
          }),
          ...(!options.image && { text: options.caption }),
          parse_mode: options.parseMode,
          ...(showMarkup && {
            reply_markup: {
              inline_keyboard: options.markup,
            },
          }),
        },
      })
      .json();
  }
}
