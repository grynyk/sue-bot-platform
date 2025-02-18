import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { NAVIGATION_CALLBACK } from '../enums';
import { ButtonsMarkup } from './models';

export const buttonsMarkup: ButtonsMarkup = {
  start: (): Array<InlineKeyboardButton.CallbackButton[]> => [
    [
      {
        text: 'Натисни та розпочни "Магію звички"',
        callback_data: NAVIGATION_CALLBACK.BOT_START,
      },
    ],
  ],
  confirm: (text: string): Array<InlineKeyboardButton.CallbackButton[]> => [
    [{ text, callback_data: NAVIGATION_CALLBACK.CONFIRM }],
  ],
  urlButton: (
    text: string,
    url: string
  ): Array<InlineKeyboardButton.UrlButton> => [{ text, url }],
  callbackButton: (
    text: string,
    callbackData: string
  ): Array<InlineKeyboardButton.CallbackButton> => [
    { text, callback_data: callbackData },
  ],
};
