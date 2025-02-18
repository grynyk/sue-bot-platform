import { NAVIGATION_CALLBACK } from '../../shared/enums';
import { StaticData } from '../../static/models';

export const recipesData: StaticData = {
  data: [
    {
      callbackData: 'recipe_brownie',
      response: `https://www.instagram.com/p/B_iL8xYJMnW/`,
    },
    {
      callbackData: 'recipe_bowl',
      response: `https://www.instagram.com/p/CB7xwCOpsA7/`,
    },
    {
      callbackData: 'recipe_vegan_ratatouille',
      response: `https://www.instagram.com/p/CEWJy9IpDOe/`,
    },
    {
      callbackData: 'recipe_vegan_risotto',
      response: `https://www.instagram.com/p/CFUuLtQpNQr/`,
    },
    {
      callbackData: 'recipe_vegan_icecream',
      response: `https://www.instagram.com/p/B_rYvUrJtmn/`,
    },
    {
      callbackData: 'recipe_vegan_chia',
      response: `https://www.instagram.com/p/CCd41knpnr-/`,
    },
    {
      callbackData: 'recipe_vegan_bread',
      response: `https://www.instagram.com/p/CDHO2bFp1uo/`,
    },
    {
      callbackData: 'recipe_vegan_napoleon',
      response: `https://www.instagram.com/p/CKTDATcp67O/`,
    },
    {
      callbackData: 'recipe_cabbage_tahini',
      response: `https://www.instagram.com/p/CFM6HDpJXsX/`,
    },
    {
      callbackData: NAVIGATION_CALLBACK.RECIPES_BACK,
    },
  ],
};
