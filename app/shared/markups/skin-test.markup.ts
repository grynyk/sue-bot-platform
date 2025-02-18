import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import {
  NAVIGATION_CALLBACK,
  NAVIGATION_ICON,
  MARKUP_DIRECTION,
  SkinTestEnums,
} from '../enums';
import { KeyboardMarkupUtils } from '../../shared/utils';
import { SkinTestMarkup } from './models';

export const skinTestDynamicMarkup = {
  BUY_LINK: (url: string) =>
    KeyboardMarkupUtils.createButtons(
      [
        { text: 'Купити комплекс', callback_data: url },
        {
          text: NAVIGATION_ICON.CLOSE,
          callback_data: NAVIGATION_CALLBACK.CLOSE,
        },
      ],
      MARKUP_DIRECTION.VERTICAL
    ),
  COMPLEX_SIZE: (
    callback: string
  ): Array<InlineKeyboardButton.CallbackButton[]> => [
    [
      { text: 'Міні', callback_data: `${callback}_mini` },
      { text: 'Максі', callback_data: `${callback}_maxi` },
    ],
    [
      {
        text: NAVIGATION_ICON.BACK,
        callback_data: SkinTestEnums.BUTTONS.BACK,
      },
    ],
  ],
  RESULT_LINKS: (callback: string, buyLink?: string) =>
    KeyboardMarkupUtils.createButtons(
      [
        { text: 'Купити', callback_data: buyLink },
        {
          text: 'Що входить ?',
          callback_data: `${callback}_composition`,
        },
        {
          text: 'Спосіб використання',
          callback_data: `${callback}_usage`,
        },
        {
          text: 'Рекомендації',
          callback_data: `${callback}_recommendations`,
        },
        {
          text: 'Консультація косметолога',
          callback_data: `https://suemade.com/consultation/`,
        },
        {
          text: NAVIGATION_ICON.BACK,
          callback_data: SkinTestEnums.BUTTONS.BACK,
        },
        {
          text: NAVIGATION_ICON.CLOSE,
          callback_data: SkinTestEnums.BUTTONS.CLOSE,
        },
      ],
      MARKUP_DIRECTION.VERTICAL
    ),
};

export const skinTestMarkup: SkinTestMarkup = {
  KNOWN_TYPE: [
    [
      { text: 'Так', callback_data: SkinTestEnums.KNOWN_TYPE.KNOWN },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.KNOWN_TYPE.UNKNOWN,
      },
    ],
    [
      {
        text: NAVIGATION_ICON.CLOSE,
        callback_data: SkinTestEnums.BUTTONS.CLOSE,
      },
    ],
  ],
  WANNA_CHECK: [
    [
      { text: 'Так', callback_data: SkinTestEnums.WANNA_CHECK.YES },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.WANNA_CHECK.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  YOUR_AGE: [
    [
      { text: 'До 15', callback_data: SkinTestEnums.YOUR_AGE.BEFORE_15 },
      {
        text: '16-45',
        callback_data: SkinTestEnums.YOUR_AGE.BETWEEN_16_45,
      },
      {
        text: '45+',
        callback_data: SkinTestEnums.YOUR_AGE.AFTER_45,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  ARE_PORES: [
    [
      { text: 'Так', callback_data: SkinTestEnums.PORES.IF_ARE.YES },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.PORES.IF_ARE.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  WHERE_ARE_PORES: [
    [{ text: 'В Т-Зоні', callback_data: SkinTestEnums.PORES.WHERE_ARE.T_ZONE }],
    [
      {
        text: 'Майже непомітні на обличчі',
        callback_data: SkinTestEnums.PORES.WHERE_ARE.UNNOTICED,
      },
    ],
    [
      {
        text: 'Взагалі не видно пор',
        callback_data: SkinTestEnums.PORES.WHERE_ARE.INVISIBLE,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  PORES_IS_FAT_BLAZE: [
    [
      { text: 'Так', callback_data: SkinTestEnums.PORES.FAT_BLAZE.YES },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.PORES.FAT_BLAZE.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  PORES_T_ZONE_IS_FAT_BLAZE: [
    [
      { text: 'Так', callback_data: SkinTestEnums.PORES.T_ZONE.FAT_BLAZE.YES },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.PORES.T_ZONE.FAT_BLAZE.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  PORES_T_ZONE_IS_DRY_PEEL: [
    [
      { text: 'Так', callback_data: SkinTestEnums.PORES.T_ZONE.DRY_PEEL.YES },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.PORES.T_ZONE.DRY_PEEL.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  PORES_UNNOTICED_ARE_CAMEDONES: [
    [
      {
        text: 'Так',
        callback_data: SkinTestEnums.PORES.UNNOTICED.ARE_CAMEDONES.YES,
      },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.PORES.UNNOTICED.ARE_CAMEDONES.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  PORES_UNNOTICED_DRY_TIGHT: [
    [
      {
        text: 'Так',
        callback_data: SkinTestEnums.PORES.UNNOTICED.DRY_TIGHT.YES,
      },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.PORES.UNNOTICED.DRY_TIGHT.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  PORES_INVISIBLE_SENSITIVITY_REDNESS: [
    [
      {
        text: 'Так',
        callback_data: SkinTestEnums.PORES.INVISIBLE.SENSITIVITY_REDNESS.YES,
      },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.PORES.INVISIBLE.SENSITIVITY_REDNESS.NO,
      },
    ],
  ],
  PORES_INVISIBLE_DULL_WRINKLES: [
    [
      {
        text: 'Так',
        callback_data: SkinTestEnums.PORES.INVISIBLE.DULL_WRINKLES.YES,
      },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.PORES.INVISIBLE.DULL_WRINKLES.NO,
      },
    ],
  ],
  IS_RASH: [
    [
      { text: 'Так', callback_data: SkinTestEnums.RASH.IF_ARE.YES },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.RASH.IF_ARE.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  RASH_HOW_MUCH: [
    [
      {
        text: 'Більше 10 водночас',
        callback_data: SkinTestEnums.RASH.HOW_MUCH.LESS_10,
      },
      {
        text: 'Менше 10 водночас',
        callback_data: SkinTestEnums.RASH.HOW_MUCH.MORE_10,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  RASH_ARE_PORES: [
    [
      { text: 'Так', callback_data: SkinTestEnums.RASH.ARE_PORES.YES },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.RASH.ARE_PORES.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  RASH_FAT_BLAZE_T_ZONE: [
    [
      { text: 'Так', callback_data: SkinTestEnums.RASH.FAT_BLAZE_T_ZONE.YES },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.RASH.FAT_BLAZE_T_ZONE.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  RASH_DRY_PEEL_T_ZONE_1: [
    [
      { text: 'Так', callback_data: SkinTestEnums.RASH.DRY_PEEL_T_ZONE_1.YES },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.RASH.DRY_PEEL_T_ZONE_1.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  RASH_DRY_PEEL_T_ZONE_2: [
    [
      { text: 'Так', callback_data: SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2.YES },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  RASH_DRY_PEEL_T_ZONE_2_HOW_OFTEN: [
    [
      {
        text: 'Поодинокі прищики 1-2 рази на місяць',
        callback_data:
          SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH.ABOUT_1_2,
      },
    ],
    [
      {
        text: 'До 10 запальних процесів на постійній основі',
        callback_data:
          SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH.UNDER_10,
      },
    ],
    [
      {
        text: 'Незначна кількість чорних цяток',
        callback_data: SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH.FEW,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  RASH_FAT_BLAZE: [
    [
      { text: 'Так', callback_data: SkinTestEnums.RASH.FAT_BLAZE.YES },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.RASH.FAT_BLAZE.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  RASH_DRY_PEEL: [
    [
      { text: 'Так', callback_data: SkinTestEnums.RASH.DRY_PEEL.YES },
      {
        text: 'Ні',
        callback_data: SkinTestEnums.RASH.DRY_PEEL.NO,
      },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  TYPES: [
    [
      {
        text: 'Нормальний',
        callback_data: SkinTestEnums.TYPES.NORMAL,
      },
      {
        text: 'Комбінований',
        callback_data: SkinTestEnums.TYPES.COMBINED,
      },
    ],
    [
      { text: 'Жирний тип', callback_data: SkinTestEnums.TYPES.FAT },
      { text: 'Сухий тип', callback_data: SkinTestEnums.TYPES.DRY },
    ],
    [
      { text: 'Підліткова шкіра', callback_data: SkinTestEnums.TYPES.TEENAGE },
      { text: 'Зріла шкіра (45+)', callback_data: SkinTestEnums.TYPES.MATURE },
    ],
    [{ text: NAVIGATION_ICON.BACK, callback_data: SkinTestEnums.BUTTONS.BACK }],
  ],
  SUBTYPES: {
    NORMAL: [
      [
        {
          text: 'Здоровий нормальний тип шкіри',
          callback_data: SkinTestEnums.SUBTYPES.NORMAL.GOOD,
        },
      ],
      [
        {
          text: 'Нормальний тип шкіри з чорними цятками',
          callback_data:
            SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH.FEW,
        },
      ],
      [
        {
          text: NAVIGATION_ICON.BACK,
          callback_data: SkinTestEnums.BUTTONS.BACK,
        },
      ],
    ],
    FAT: [
      [
        {
          text: 'Здоровий жирний тип шкіри',
          callback_data: SkinTestEnums.SUBTYPES.FAT.GOOD,
        },
      ],
      [
        {
          text: 'Жирний тип шкіри з висипаннями',
          callback_data: SkinTestEnums.SUBTYPES.FAT.RASH_BLAZE,
        },
      ],
      [
        {
          text: 'Жирний тип шкіри із зневодненням',
          callback_data: SkinTestEnums.SUBTYPES.FAT.DRY,
        },
      ],
      [
        {
          text: NAVIGATION_ICON.BACK,
          callback_data: SkinTestEnums.BUTTONS.BACK,
        },
      ],
    ],
    DRY: [
      [
        {
          text: 'Сухий тип шкіри',
          callback_data: SkinTestEnums.SUBTYPES.DRY.GOOD,
        },
      ],
      [
        {
          text: NAVIGATION_ICON.BACK,
          callback_data: SkinTestEnums.BUTTONS.BACK,
        },
      ],
    ],
    COMBINED: [
      [
        {
          text: 'Здоровий комбінований тип шкіри',
          callback_data: SkinTestEnums.SUBTYPES.COMBINED.GOOD,
        },
      ],
      [
        {
          text: 'Комбінований тип шкіри з висипаннями',
          callback_data: SkinTestEnums.SUBTYPES.COMBINED.RASH_BLAZE,
        },
      ],
      [
        {
          text: 'Комбінований тип шкіри зі зневодненням',
          callback_data: SkinTestEnums.SUBTYPES.COMBINED.DRY,
        },
      ],
      [
        {
          text: NAVIGATION_ICON.BACK,
          callback_data: SkinTestEnums.BUTTONS.BACK,
        },
      ],
    ],
    TEENAGE: [
      [
        {
          text: 'Підліткова шкіра з висипаннями',
          callback_data: SkinTestEnums.SUBTYPES.TEENAGE.RASH,
        },
      ],
      [
        {
          text: 'Здорова підліткова шкіра',
          callback_data: SkinTestEnums.SUBTYPES.TEENAGE.GOOD,
        },
      ],
      [
        {
          text: NAVIGATION_ICON.BACK,
          callback_data: SkinTestEnums.BUTTONS.BACK,
        },
      ],
    ],
    MATURE: [
      [
        {
          text: 'Зріла шкіра жирного та комбінованого типів',
          callback_data: SkinTestEnums.SUBTYPES.MATURE.DULL,
        },
      ],
      [
        {
          text: 'Зріла шкіра сухого типу',
          callback_data: SkinTestEnums.SUBTYPES.MATURE.DRY,
        },
      ],
      [
        {
          text: 'Зріла шкіра нормального типу',
          callback_data: SkinTestEnums.SUBTYPES.MATURE.AGING,
        },
      ],
      [
        {
          text: NAVIGATION_ICON.BACK,
          callback_data: SkinTestEnums.BUTTONS.BACK,
        },
      ],
    ],
  },
};
