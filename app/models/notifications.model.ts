import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

export interface NotificationsData {
  specific: NotificationMessage[];
  repeatable: Partial<NotificationMessage>[];
}

export interface NotificationMessage {
  time?: number;
  text: string | string[];
  image?: string;
  reply_btn?: Array<
    InlineKeyboardButton.CallbackButton | InlineKeyboardButton.UrlButton
  >;
  week_day?: string | number;
}
