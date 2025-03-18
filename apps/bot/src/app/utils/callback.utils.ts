import { Telegraf } from 'telegraf';
import { SceneContext } from '../models';

export async function triggerCallback(bot: Telegraf, ctx: SceneContext, callbackData: string): Promise<void> {
  try {
    const updatePayload = {
      update_id: ctx.update?.update_id || Date.now(),
      navigationBack: true,
      callback_query: {
        id: ctx.callbackQuery?.id || String(Date.now()),
        from: ctx.from,
        message: ctx.callbackQuery?.message || undefined,
        chat_instance: ctx.callbackQuery?.chat_instance || String(Date.now()),
        data: callbackData,
      },
    };
    await bot.handleUpdate(updatePayload);
  } catch (error) {
    throw new Error(error.message);
  }
}
