import { Markup } from 'telegraf';

export function createButtons(callbacks: string[], labels: Record<string, string>): ReturnType<typeof Markup.button.callback>[] {
  return callbacks.map((callback: string) => Markup.button.callback(labels[callback], callback));
}
