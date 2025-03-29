import { Markup } from 'telegraf';
import { InlineKeyboardButton, InlineKeyboardMarkup } from 'typegram';
import { SETTINGS } from '../constants/settings.constant';
import { backButton, closeButton, createButtons } from '../../../utils/keyboard.utils';
import { range } from 'lodash';

export function getSettingsInitialKeyboard(): ReturnType<typeof Markup.inlineKeyboard> {
  const callbacks: string[] = Object.values(SETTINGS.CALLBACKS.MAIN);
  const buttons: InlineKeyboardButton.CallbackButton[] = [...createButtons(callbacks, SETTINGS.LABELS.MAIN), closeButton];
  const keyboard = Markup.inlineKeyboard(buttons, { columns: 1 });
  return keyboard;
}

export function getSettingsNotificationsKeyboard(enabledNotifications: boolean): ReturnType<typeof Markup.inlineKeyboard> {
  const callbacks: string[] = Object.values(SETTINGS.CALLBACKS.NOTIFICATIONS).filter((callback) =>
    enabledNotifications ? callback !== SETTINGS.CALLBACKS.NOTIFICATIONS.ENABLE : callback !== SETTINGS.CALLBACKS.NOTIFICATIONS.DISABLE
  );
  const buttons: InlineKeyboardButton.CallbackButton[] = [...createButtons(callbacks, SETTINGS.LABELS.NOTIFICATIONS), backButton];
  const keyboard = Markup.inlineKeyboard(buttons, { columns: 1 });
  return keyboard;
}

export function getSettingsNotificationTimeKeyboard(
  min: number,
  max: number,
  callbackKey: string
): ReturnType<typeof Markup.inlineKeyboard> {
  const buttons: InlineKeyboardButton.CallbackButton[] = range(min, max).flatMap((hour: number): InlineKeyboardButton.CallbackButton[] =>
    range(0, 60, 10).map((minute: number): InlineKeyboardButton.CallbackButton => {
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      return Markup.button.callback(time, `${callbackKey}_${time}`);
    })
  );
  const keyboard: Markup.Markup<InlineKeyboardMarkup> = Markup.inlineKeyboard([...buttons, backButton], { columns: 4 });
  return keyboard;
}
