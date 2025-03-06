import { Markup } from 'telegraf';
import { TIPS } from '../constants/tips.constant';
import { NAVIGATION_CALLBACK, NAVIGATION_ICON } from '../../../models/navigation.model';
import { InlineKeyboardButton } from 'typegram';
import { createButtons } from '@utils';

export function getTipsInitialKeyboard(): ReturnType<typeof Markup.inlineKeyboard> {
  const callbacks: string[] = Object.values(TIPS.CALLBACKS.MAIN);
  const buttons: InlineKeyboardButton.CallbackButton[] = [
    ...createButtons(callbacks, TIPS.LABELS.MAIN),
    Markup.button.callback(NAVIGATION_ICON.CLOSE, NAVIGATION_CALLBACK.CLOSE),
  ];
  const keyboard = Markup.inlineKeyboard(buttons, {
    wrap: (btn: InlineKeyboardButton.CallbackButton, index: number, currentRow: InlineKeyboardButton.CallbackButton[]): boolean => {
      return index > 9 || currentRow.length === 2;
    },
  });
  return keyboard;
}

export function getTipsDynamicAffirmationKeyboard(): ReturnType<typeof Markup.inlineKeyboard> {
  const callbacks: string[] = Object.values(TIPS.CALLBACKS.DYNAMIC_AFFIRMATION);
  const buttons: InlineKeyboardButton.CallbackButton[] = [
    ...createButtons(callbacks, TIPS.LABELS.DYNAMIC_AFFIRMATION),
    Markup.button.callback(NAVIGATION_ICON.BACK, NAVIGATION_CALLBACK.BACK),
  ];
  return Markup.inlineKeyboard(buttons, {
    wrap: (btn: InlineKeyboardButton.CallbackButton, index: number, currentRow: InlineKeyboardButton.CallbackButton[]): boolean => {
      return index > 12 || currentRow.length === 2;
    },
  });
}

export function getTipsMusicAffirmationKeyboard(): ReturnType<typeof Markup.inlineKeyboard> {
  const callbacks: string[] = Object.values(TIPS.CALLBACKS.MUSIC_AFFIRMATION);
  const buttons: InlineKeyboardButton.CallbackButton[] = [
    ...createButtons(callbacks, TIPS.LABELS.MUSIC_AFFIRMATION),
    Markup.button.callback(NAVIGATION_ICON.BACK, NAVIGATION_CALLBACK.BACK),
  ];
  return Markup.inlineKeyboard(buttons, {
    wrap: (btn: InlineKeyboardButton.CallbackButton, index: number, currentRow: InlineKeyboardButton.CallbackButton[]): boolean => {
      return currentRow.length === 1;
    },
  });
}
