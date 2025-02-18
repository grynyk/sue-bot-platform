import Context from 'telegraf/typings/context';
import {
  NAVIGATION_ICON,
  MARKUP_DIRECTION,
  NAVIGATION_CALLBACK,
  MESSAGE_DELIVERY_TYPE,
} from '../shared/enums';
import { recipesMarkup } from '../shared/markups';
import { RecipesControllerModel } from '../models';
import { DataUtils, KeyboardMarkupUtils, TgUtils } from '../shared/utils';
import { StaticDataItem } from '../static/models';
import { recipesData } from '../static/data';

export const RecipesController: RecipesControllerModel = {
  async callbacksHandler(ctx: Context, callback: string): Promise<void> {
    try {
      if (callback === NAVIGATION_CALLBACK.RECIPES_BACK) {
        await TgUtils.deliverMessage(
          ctx,
          MESSAGE_DELIVERY_TYPE.EDIT_PREVIOUS,
          'Рецепти:',
          { markup: recipesMarkup }
        );
        return;
      }
      recipesData.data.forEach(async (item: StaticDataItem): Promise<void> => {
        if (!DataUtils.equalOrHas(item.callbackData, callback)) {
          return;
        }
        ctx.deleteMessage();
        await TgUtils.deliverMessage(
          ctx,
          MESSAGE_DELIVERY_TYPE.SEND_NEW,
          item.response,
          {
            markup: KeyboardMarkupUtils.createButtons(
              [
                {
                  text: NAVIGATION_ICON.BACK,
                  callback_data: NAVIGATION_CALLBACK.RECIPES_BACK,
                },
              ],
              MARKUP_DIRECTION.HORIZONTAL
            ),
          }
        );
      });
    } catch (error: unknown) {
      throw new Error(`${error}`);
    }
  },
};
