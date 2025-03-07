import { Markup } from 'telegraf';
import { InlineKeyboardButton } from 'typegram';
import { SETTINGS } from '../constants/settings.constant';
import { backButton, closeButton, createButtons } from '@utils/keyboard.utils';

export function getSettingsInitialKeyboard(): ReturnType<typeof Markup.inlineKeyboard> {
  const callbacks: string[] = Object.values(SETTINGS.CALLBACKS.MAIN);
  const buttons: InlineKeyboardButton.CallbackButton[] = [
    ...createButtons(callbacks, SETTINGS.LABELS.MAIN),
    closeButton,
  ];
  const keyboard = Markup.inlineKeyboard(buttons, { columns: 1 });
  return keyboard;
}

export function getSettingsNotificationsKeyboard(enabledNotifications: boolean): ReturnType<typeof Markup.inlineKeyboard> {
  const callbacks: string[] = Object.values(SETTINGS.CALLBACKS.NOTIFICATIONS).filter(callback => enabledNotifications ? callback !== SETTINGS.CALLBACKS.NOTIFICATIONS.ENABLE : callback !== SETTINGS.CALLBACKS.NOTIFICATIONS.DISABLE);
  const buttons: InlineKeyboardButton.CallbackButton[] = [
    ...createButtons(callbacks, SETTINGS.LABELS.NOTIFICATIONS),
    backButton,
  ];
  const keyboard = Markup.inlineKeyboard(buttons, { columns: 1 });
  return keyboard;
}
