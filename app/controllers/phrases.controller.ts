import { isNil } from 'lodash';
import { Context, Telegraf } from 'telegraf';
import { PARSE_MODE } from '../shared/enums';
import { PhrasesControllerModel } from '../models';
import { DataUtils } from '../shared/utils';
import { StaticDataItem } from '../static/models';
import { HearPhrasesData } from '../static/data';

export const PhrasesController: PhrasesControllerModel = {
  listenToPhrase(bot: Telegraf, phrase: string): void {
    if (isNil(bot)) {
      return;
    }
    bot.hears(new RegExp(phrase, 'gi'), (ctx: Context): void => {
      HearPhrasesData.data.forEach(
        async (item: StaticDataItem): Promise<void> => {
          if (!DataUtils.equalOrHas(item.callbackData, phrase)) {
            return;
          }
          await ctx.reply(item.response, {
            reply_to_message_id: ctx.message.message_id,
            parse_mode: PARSE_MODE.HTML,
          });
        }
      );
    });
  },
};
