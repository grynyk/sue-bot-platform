import { Markup } from 'telegraf';
import { InlineKeyboardButton } from 'typegram';
import { RECIPES } from '../constants/recipes.constant';
import { closeButton, createButtons } from '../../../utils/keyboard.utils';

export function getRecipesInitialKeyboard(): ReturnType<typeof Markup.inlineKeyboard> {
  const callbacks: string[] = Object.values(RECIPES.CALLBACKS.MAIN);
  const buttons: InlineKeyboardButton.CallbackButton[] = [...createButtons(callbacks, RECIPES.LABELS.MAIN), closeButton];
  const keyboard = Markup.inlineKeyboard(buttons, {
    wrap: (btn: InlineKeyboardButton.CallbackButton, index: number, currentRow: InlineKeyboardButton.CallbackButton[]): boolean => {
      return index > 7 || currentRow.length === 2;
    },
  });
  return keyboard;
}
