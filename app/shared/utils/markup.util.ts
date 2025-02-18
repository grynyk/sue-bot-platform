import { isNil } from 'lodash';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { MARKUP_DIRECTION } from '../enums';
import { buttonsMarkup } from '../markups';
import { FormatUtils } from '../utils';

export class KeyboardMarkupUtils {
  public static createButtons(
    buttons: Array<InlineKeyboardButton>,
    direction: MARKUP_DIRECTION
  ): Array<InlineKeyboardButton[]> {
    let generatedMarkup = [];
    const isHorizontal: boolean = direction === MARKUP_DIRECTION.HORIZONTAL;
    buttons.forEach((btn: unknown): void => {
      const button = btn as InlineKeyboardButton.CallbackButton &
        InlineKeyboardButton.UrlButton;
      if (isNil(button.callback_data) || isNil(button.text)) {
        return;
      }
      const buttonMarkup = FormatUtils.isURL(button.callback_data)
        ? buttonsMarkup.urlButton(
            button.text,
            button.url || button.callback_data
          )
        : buttonsMarkup.callbackButton(button.text, button.callback_data);
      generatedMarkup = isHorizontal
        ? [...generatedMarkup, ...buttonMarkup]
        : [...generatedMarkup, buttonMarkup];
    });
    return isHorizontal ? [generatedMarkup] : generatedMarkup;
  }
}
