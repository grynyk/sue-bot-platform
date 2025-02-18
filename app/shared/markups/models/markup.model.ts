import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

export interface ButtonsMarkup {
  start: () => Array<InlineKeyboardButton.CallbackButton[]>;
  confirm: (text: string) => Array<InlineKeyboardButton.CallbackButton[]>;
  urlButton: (
    text: string,
    url: string
  ) => Array<InlineKeyboardButton.UrlButton>;
  callbackButton: (
    text: string,
    callbackData: string
  ) => Array<InlineKeyboardButton.CallbackButton>;
}

export interface NotificationsManagerMarkup {
  day_time: (
    isNotificationsEnabled: boolean
  ) => Array<InlineKeyboardButton.CallbackButton[]>;
  wake_up_time: Array<InlineKeyboardButton.CallbackButton[]>;
  bed_time: Array<InlineKeyboardButton.CallbackButton[]>;
}

export interface SkinTestMarkup {
  KNOWN_TYPE: Array<InlineKeyboardButton.CallbackButton[]>;
  WANNA_CHECK: Array<InlineKeyboardButton.CallbackButton[]>;
  YOUR_AGE: Array<InlineKeyboardButton.CallbackButton[]>;
  ARE_PORES: Array<InlineKeyboardButton.CallbackButton[]>;
  WHERE_ARE_PORES: Array<InlineKeyboardButton.CallbackButton[]>;
  PORES_IS_FAT_BLAZE: Array<InlineKeyboardButton.CallbackButton[]>;
  PORES_T_ZONE_IS_FAT_BLAZE: Array<InlineKeyboardButton.CallbackButton[]>;
  PORES_T_ZONE_IS_DRY_PEEL: Array<InlineKeyboardButton.CallbackButton[]>;
  PORES_UNNOTICED_ARE_CAMEDONES: Array<InlineKeyboardButton.CallbackButton[]>;
  PORES_UNNOTICED_DRY_TIGHT: Array<InlineKeyboardButton.CallbackButton[]>;
  PORES_INVISIBLE_SENSITIVITY_REDNESS: Array<
    InlineKeyboardButton.CallbackButton[]
  >;
  PORES_INVISIBLE_DULL_WRINKLES: Array<InlineKeyboardButton.CallbackButton[]>;
  IS_RASH: Array<InlineKeyboardButton.CallbackButton[]>;
  RASH_HOW_MUCH: Array<InlineKeyboardButton.CallbackButton[]>;
  RASH_ARE_PORES: Array<InlineKeyboardButton.CallbackButton[]>;
  RASH_FAT_BLAZE_T_ZONE: Array<InlineKeyboardButton.CallbackButton[]>;
  RASH_DRY_PEEL_T_ZONE_1: Array<InlineKeyboardButton.CallbackButton[]>;
  RASH_DRY_PEEL_T_ZONE_2: Array<InlineKeyboardButton.CallbackButton[]>;
  RASH_DRY_PEEL_T_ZONE_2_HOW_OFTEN: Array<
    InlineKeyboardButton.CallbackButton[]
  >;
  RASH_FAT_BLAZE: Array<InlineKeyboardButton.CallbackButton[]>;
  RASH_DRY_PEEL: Array<InlineKeyboardButton.CallbackButton[]>;
  TYPES: Array<InlineKeyboardButton.CallbackButton[]>;
  SUBTYPES: {
    NORMAL: Array<InlineKeyboardButton.CallbackButton[]>;
    FAT: Array<InlineKeyboardButton.CallbackButton[]>;
    DRY: Array<InlineKeyboardButton.CallbackButton[]>;
    COMBINED: Array<InlineKeyboardButton.CallbackButton[]>;
    TEENAGE: Array<InlineKeyboardButton.CallbackButton[]>;
    MATURE: Array<InlineKeyboardButton.CallbackButton[]>;
  };
}
