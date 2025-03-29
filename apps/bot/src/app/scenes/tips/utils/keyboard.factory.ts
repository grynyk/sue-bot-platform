import { Markup } from 'telegraf';
import { TIPS } from '../constants/tips.constant';
import { InlineKeyboardButton } from 'typegram';
import { backButton, closeButton, createButtons } from '../../../utils/keyboard.utils';

export function getTipsInitialKeyboard(): ReturnType<typeof Markup.inlineKeyboard> {
  const callbacks: string[] = Object.values(TIPS.CALLBACKS.MAIN);
  const buttons: InlineKeyboardButton.CallbackButton[] = [...createButtons(callbacks, TIPS.LABELS.MAIN), closeButton];
  const keyboard = Markup.inlineKeyboard(buttons, {
    wrap: (btn: InlineKeyboardButton.CallbackButton, index: number, currentRow: InlineKeyboardButton.CallbackButton[]): boolean => {
      return index > 9 || currentRow.length === 2;
    },
  });
  return keyboard;
}

export function getTipsDynamicAffirmationKeyboard(): ReturnType<typeof Markup.inlineKeyboard> {
  const callbacks: string[] = Object.values(TIPS.CALLBACKS.DYNAMIC_AFFIRMATION);
  const buttons: InlineKeyboardButton.CallbackButton[] = [...createButtons(callbacks, TIPS.LABELS.DYNAMIC_AFFIRMATION), backButton];
  return Markup.inlineKeyboard(buttons, {
    wrap: (btn: InlineKeyboardButton.CallbackButton, index: number, currentRow: InlineKeyboardButton.CallbackButton[]): boolean => {
      return index > 12 || currentRow.length === 2;
    },
  });
}

export function getTipsMusicAffirmationKeyboard(): ReturnType<typeof Markup.inlineKeyboard> {
  const callbacks: string[] = Object.values(TIPS.CALLBACKS.MUSIC_AFFIRMATION);
  const buttons: InlineKeyboardButton.CallbackButton[] = [...createButtons(callbacks, TIPS.LABELS.MUSIC_AFFIRMATION), backButton];
  return Markup.inlineKeyboard(buttons, {
    wrap: (btn: InlineKeyboardButton.CallbackButton, index: number, currentRow: InlineKeyboardButton.CallbackButton[]): boolean => {
      return currentRow.length === 1;
    },
  });
}
