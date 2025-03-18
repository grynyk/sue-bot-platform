import { RECIPES_MAIN_BUTTON_CALLBACK } from '../enums/recipes.enum';
import { RecipesSceneStructure } from '../models/recipes.model';

export const RECIPES: RecipesSceneStructure = {
  CALLBACKS: {
    MAIN: RECIPES_MAIN_BUTTON_CALLBACK,
  },
  LABELS: {
    MAIN: {
      [RECIPES_MAIN_BUTTON_CALLBACK.VEGAN_ICECREAM]: 'Морозиво веган',
      [RECIPES_MAIN_BUTTON_CALLBACK.BROWNIE]: 'Брауні',
      [RECIPES_MAIN_BUTTON_CALLBACK.BOWL]: 'Боул',
      [RECIPES_MAIN_BUTTON_CALLBACK.VEGAN_CHIA]: 'Чіа варення',
      [RECIPES_MAIN_BUTTON_CALLBACK.VEGAN_RATATOUILLE]: 'Рататуй',
      [RECIPES_MAIN_BUTTON_CALLBACK.VEGAN_RISOTTO]: 'Різото',
      [RECIPES_MAIN_BUTTON_CALLBACK.VEGAN_NAPOLEON]: 'Наполеон',
      [RECIPES_MAIN_BUTTON_CALLBACK.VEGAN_BREAD]: 'Хліб з зеленої гречки',
      [RECIPES_MAIN_BUTTON_CALLBACK.CABBAGE_TAHINI]: 'Цвітна капуста із соусом тахіні',
    },
  },
  RESPONSES: {
    MAIN: {
      [RECIPES_MAIN_BUTTON_CALLBACK.VEGAN_ICECREAM]: 'https://www.instagram.com/p/B_rYvUrJtmn/',
      [RECIPES_MAIN_BUTTON_CALLBACK.BROWNIE]: 'https://www.instagram.com/p/B_iL8xYJMnW/',
      [RECIPES_MAIN_BUTTON_CALLBACK.BOWL]: 'https://www.instagram.com/p/CB7xwCOpsA7/',
      [RECIPES_MAIN_BUTTON_CALLBACK.VEGAN_CHIA]: 'https://www.instagram.com/p/CCd41knpnr-/',
      [RECIPES_MAIN_BUTTON_CALLBACK.VEGAN_RATATOUILLE]: 'https://www.instagram.com/p/CEWJy9IpDOe/',
      [RECIPES_MAIN_BUTTON_CALLBACK.VEGAN_RISOTTO]: 'https://www.instagram.com/p/CFUuLtQpNQr/',
      [RECIPES_MAIN_BUTTON_CALLBACK.VEGAN_NAPOLEON]: 'https://www.instagram.com/p/CKTDATcp67O/',
      [RECIPES_MAIN_BUTTON_CALLBACK.VEGAN_BREAD]: 'https://www.instagram.com/p/CDHO2bFp1uo/',
      [RECIPES_MAIN_BUTTON_CALLBACK.CABBAGE_TAHINI]: 'https://www.instagram.com/p/CFM6HDpJXsX/',
    },
  },
};
