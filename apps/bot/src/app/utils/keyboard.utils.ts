import { NAVIGATION_CALLBACK, NAVIGATION_ICON } from '../models/navigation.model';
import { Markup } from 'telegraf';
import { InlineKeyboardButton, InlineKeyboardMarkup } from 'typegram';

export function createButtons(callbacks: string[], labels: Record<string, string>): ReturnType<typeof Markup.button.callback>[] {
  return callbacks.map((callback: string) => Markup.button.callback(labels[callback], callback));
}

export const backButton: InlineKeyboardButton.CallbackButton = Markup.button.callback(NAVIGATION_ICON.BACK, NAVIGATION_CALLBACK.BACK);
export const closeButton: InlineKeyboardButton.CallbackButton = Markup.button.callback(NAVIGATION_ICON.CLOSE, NAVIGATION_CALLBACK.CLOSE);
export const confirmButton: InlineKeyboardButton.CallbackButton = Markup.button.callback(NAVIGATION_ICON.CONFIRM, NAVIGATION_CALLBACK.CONFIRM)
export const backButtonKeyboard: Markup.Markup<InlineKeyboardMarkup> = Markup.inlineKeyboard([backButton]);
export const closeButtonKeyboard: Markup.Markup<InlineKeyboardMarkup> = Markup.inlineKeyboard([closeButton]);
export const confirmButtonKeyboard: Markup.Markup<InlineKeyboardMarkup> = Markup.inlineKeyboard([confirmButton]);
