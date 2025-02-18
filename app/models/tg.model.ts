import { PARSE_MODE } from '../shared/enums';
import Context from 'telegraf/typings/context';
import {
  InlineKeyboardButton,
  Message,
} from 'telegraf/typings/core/types/typegram';
export interface TgMessageHttpResponse {
  ok: boolean;
  result: Message.TextMessage;
}

export interface TgHttpError {
  statusCode: number;
  [key: string]: unknown;
}

export interface ResponseResult {
  message_id: number;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    username: string;
  };
  chat: {
    id: number;
    first_name: string;
    last_name: string;
    type: string;
  };
  date: Date;
  text: string;
  reply_markup: {
    inline_keyboard: Array<InlineKeyboardButton.CallbackButton[]>;
  };
}

export interface SendMessageOptions {
  showMarkup?: boolean;
  markup?: Array<InlineKeyboardButton[]>;
  markupPosition?: 'horizontal' | 'vertical';
  parseMode?: PARSE_MODE;
  editMessageId?: string | number;
  image?: string;
  caption?: string;
}

export interface TgCommandDataItem {
  name: string;
  callbackFn: (ctx: Context) => void;
}
