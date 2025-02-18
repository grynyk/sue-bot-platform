import { SkinTestEnums } from '../shared/enums';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

export interface SkinTestResultData {
  text: string;
  url?: string;
}

export interface QuestionCaptionAndKeyboardMarkup {
  caption: string;
  markup: Array<InlineKeyboardButton.CallbackButton[]>;
}

export interface SkinTestDataItem {
  callbackData: string[];
  title: string;
  complexInfo: ComplexSizes;
}

export interface ComplexSizes {
  mini: SeasonComplexTypes;
  maxi: SeasonComplexTypes;
}

interface SeasonComplexInfo {
  srcUrl: string;
  imageUrl: string;
  usageText: string;
  compositionText: string;
  recommendationsText: string;
}
export interface SeasonComplexTypes {
  summerComplex: SeasonComplexInfo;
  winterComplex: SeasonComplexInfo;
}

export type SkinTestResultCallbacks =
  | SkinTestEnums.SUBTYPES.TEENAGE.GOOD
  | SkinTestEnums.SUBTYPES.TEENAGE.RASH
  | SkinTestEnums.PORES.INVISIBLE.DULL_WRINKLES.NO
  | SkinTestEnums.SUBTYPES.DRY.GOOD
  | SkinTestEnums.SUBTYPES.DRY.REDNESS
  | SkinTestEnums.PORES.INVISIBLE.DULL_WRINKLES.YES
  | SkinTestEnums.SUBTYPES.DRY.DULL_WRINKLES
  | SkinTestEnums.PORES.T_ZONE.DRY_PEEL.YES
  | SkinTestEnums.RASH.DRY_PEEL_T_ZONE_1.YES
  | SkinTestEnums.SUBTYPES.COMBINED.DRY
  | SkinTestEnums.PORES.T_ZONE.DRY_PEEL.NO
  | SkinTestEnums.SUBTYPES.COMBINED.GOOD
  | SkinTestEnums.SUBTYPES.COMBINED.RASH_BLAZE
  | SkinTestEnums.PORES.UNNOTICED.DRY_TIGHT.YES
  | SkinTestEnums.SUBTYPES.NORMAL.DRY
  | SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2.YES
  | SkinTestEnums.RASH.DRY_PEEL.YES
  | SkinTestEnums.SUBTYPES.FAT.DRY
  | SkinTestEnums.RASH.DRY_PEEL.NO
  | SkinTestEnums.SUBTYPES.FAT.RASH_BLAZE
  | SkinTestEnums.SUBTYPES.MATURE.DRY
  | SkinTestEnums.SUBTYPES.MATURE.AGING
  | SkinTestEnums.SUBTYPES.MATURE.DULL
  | SkinTestEnums.PORES.FAT_BLAZE.YES
  | SkinTestEnums.PORES.FAT_BLAZE.NO
  | SkinTestEnums.SUBTYPES.FAT.GOOD
  | SkinTestEnums.PORES.INVISIBLE.SENSITIVITY_REDNESS.YES
  | SkinTestEnums.RASH.DRY_PEEL_T_ZONE_1.NO
  | SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH.UNDER_10
  | SkinTestEnums.PORES.UNNOTICED.DRY_TIGHT.NO
  | SkinTestEnums.SUBTYPES.NORMAL.GOOD
  | SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH.ABOUT_1_2
  | SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH.FEW
  | SkinTestEnums.PORES.UNNOTICED.ARE_CAMEDONES.YES;
