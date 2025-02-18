import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { NAVIGATION_CALLBACK, NAVIGATION_ICON } from '../enums';

export const recipesMarkup: Array<InlineKeyboardButton.CallbackButton[]> = [
  [
    { text: 'Морозиво веган', callback_data: 'recipe_vegan_icecream' },
    { text: 'Брауні', callback_data: 'recipe_brownie' },
  ],
  [
    { text: 'Боул', callback_data: 'recipe_bowl' },
    { text: 'Чіа варення', callback_data: 'recipe_vegan_chia' },
  ],
  [
    { text: 'Рататуй', callback_data: 'recipe_vegan_ratatouille' },
    { text: 'Різото', callback_data: 'recipe_vegan_risotto' },
  ],
  [
    { text: 'Хліб з зеленої гречки', callback_data: 'recipe_vegan_bread' },
    { text: 'Наполеон', callback_data: 'recipe_vegan_napoleon' },
  ],
  [
    {
      text: 'Цвітна капуста із соусом тахіні',
      callback_data: 'recipe_cabbage_tahini',
    },
  ],
  [{ text: NAVIGATION_ICON.CLOSE, callback_data: NAVIGATION_CALLBACK.CLOSE }],
];
