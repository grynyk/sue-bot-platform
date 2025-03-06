import { DeleteAndReplyOptions, PARSE_MODE, SceneContext } from '@models';
import { isNil } from 'lodash';
import { Markup } from 'telegraf';
import { Message } from '@telegraf/types';

export async function deleteAndReply<T extends SceneContext>(
  ctx: T,
  caption: string,
  keyboard: ReturnType<typeof Markup.inlineKeyboard>,
  options: DeleteAndReplyOptions = {}
): Promise<Message> {
  const { deletePreviousMessage = true, image = null }: DeleteAndReplyOptions = options;
  try {
    if (deletePreviousMessage) {
      await ctx.deleteMessage();
    }
    const parse_mode: PARSE_MODE = PARSE_MODE.HTML;
    return isNil(image)
      ? await ctx.reply(caption, { parse_mode, ...keyboard })
      : await ctx.replyWithPhoto(image, { caption, parse_mode, ...keyboard });
  } catch (error) {
    throw new Error(error.message);
  }
}
