import { SkinTestEnums, SkinTestResultTitles } from '../../shared/enums';
import { DataUtils } from '../../shared/utils';
import { StaticData } from '../../static/models';
import { NOT_IN_UNION_TYPE } from '../../shared/error-messages';

export const skinTestCallbacksData: StaticData = {
  data: [
    {
      callbackData: [SkinTestEnums.KNOWN_TYPE.KNOWN],
      getMarkupTargetKey: (): string => SkinTestEnums.MarkupKeys.WANNA_CHECK,
    },
    {
      callbackData: [SkinTestEnums.WANNA_CHECK.NO],
      getMarkupTargetKey: (): string => SkinTestEnums.MarkupKeys.TYPES,
    },
    {
      callbackData: [SkinTestEnums.KNOWN_TYPE.UNKNOWN],
      getMarkupTargetKey: (): string => SkinTestEnums.MarkupKeys.YOUR_AGE,
    },
    {
      callbackData: [SkinTestEnums.YOUR_AGE.BEFORE_15],
      getMarkupTargetKey: (): string => SkinTestEnums.MarkupKeys.TEENAGE,
    },
    {
      callbackData: [SkinTestEnums.YOUR_AGE.AFTER_45],
      getMarkupTargetKey: (): string => SkinTestEnums.MarkupKeys.MATURE,
    },
    {
      callbackData: [
        SkinTestEnums.YOUR_AGE.BETWEEN_16_45,
        SkinTestEnums.WANNA_CHECK.YES,
      ],
      getMarkupTargetKey: (): string => SkinTestEnums.MarkupKeys.IS_RASH,
    },
    {
      callbackData: [SkinTestEnums.RASH.IF_ARE.NO],
      getMarkupTargetKey: (): string => SkinTestEnums.MarkupKeys.ARE_PORES,
    },
    {
      callbackData: [SkinTestEnums.RASH.IF_ARE.YES],
      getMarkupTargetKey: (): string => SkinTestEnums.MarkupKeys.RASH_HOW_MUCH,
    },
    {
      callbackData: [
        SkinTestEnums.RASH.HOW_MUCH.LESS_10,
        SkinTestEnums.RASH.HOW_MUCH.MORE_10,
      ],
      getMarkupTargetKey: (): string => SkinTestEnums.MarkupKeys.RASH_ARE_PORES,
    },
    {
      callbackData: [SkinTestEnums.RASH.ARE_PORES.NO],
      getMarkupTargetKey: (): string =>
        SkinTestEnums.MarkupKeys.RASH_FAT_BLAZE_T_ZONE,
    },
    {
      callbackData: [SkinTestEnums.RASH.ARE_PORES.YES],
      getMarkupTargetKey: (): string => SkinTestEnums.MarkupKeys.RASH_FAT_BLAZE,
    },
    {
      callbackData: [
        SkinTestEnums.RASH.FAT_BLAZE.YES,
        SkinTestEnums.RASH.FAT_BLAZE.NO,
      ],
      getMarkupTargetKey: (): string => SkinTestEnums.MarkupKeys.RASH_DRY_PEEL,
    },
    {
      callbackData: [SkinTestEnums.RASH.FAT_BLAZE_T_ZONE.YES],
      getMarkupTargetKey: (): string =>
        SkinTestEnums.MarkupKeys.RASH_DRY_PEEL_T_ZONE_1,
    },
    {
      callbackData: [SkinTestEnums.RASH.FAT_BLAZE_T_ZONE.NO],
      getMarkupTargetKey: (): string =>
        SkinTestEnums.MarkupKeys.RASH_DRY_PEEL_T_ZONE_2,
    },
    {
      callbackData: [SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2.NO],
      getMarkupTargetKey: (): string =>
        SkinTestEnums.MarkupKeys.RASH_DRY_PEEL_T_ZONE_2_HOW_OFTEN,
    },
    {
      callbackData: [SkinTestEnums.PORES.IF_ARE.NO],
      getMarkupTargetKey: (): string =>
        SkinTestEnums.MarkupKeys.WHERE_ARE_PORES,
    },
    {
      callbackData: [SkinTestEnums.PORES.IF_ARE.YES],
      getMarkupTargetKey: (): string =>
        SkinTestEnums.MarkupKeys.PORES_IS_FAT_BLAZE,
    },
    {
      callbackData: [SkinTestEnums.PORES.WHERE_ARE.T_ZONE],
      getMarkupTargetKey: (): string =>
        SkinTestEnums.MarkupKeys.PORES_T_ZONE_IS_FAT_BLAZE,
    },
    {
      callbackData: [
        SkinTestEnums.PORES.T_ZONE.FAT_BLAZE.YES,
        SkinTestEnums.PORES.T_ZONE.FAT_BLAZE.NO,
      ],
      getMarkupTargetKey: (): string =>
        SkinTestEnums.MarkupKeys.PORES_T_ZONE_IS_DRY_PEEL,
    },
    {
      callbackData: [SkinTestEnums.PORES.WHERE_ARE.UNNOTICED],
      getMarkupTargetKey: (): string =>
        SkinTestEnums.MarkupKeys.PORES_UNNOTICED_ARE_CAMEDONES,
    },
    {
      callbackData: [SkinTestEnums.PORES.UNNOTICED.ARE_CAMEDONES.NO],
      getMarkupTargetKey: (): string =>
        SkinTestEnums.MarkupKeys.PORES_UNNOTICED_DRY_TIGHT,
    },
    {
      callbackData: [SkinTestEnums.PORES.WHERE_ARE.INVISIBLE],
      getMarkupTargetKey: (): string =>
        SkinTestEnums.MarkupKeys.PORES_INVISIBLE_SENSITIVITY_REDNESS,
    },
    {
      callbackData: [SkinTestEnums.PORES.INVISIBLE.SENSITIVITY_REDNESS.NO],
      getMarkupTargetKey: (): string =>
        SkinTestEnums.MarkupKeys.PORES_INVISIBLE_DULL_WRINKLES,
    },
    {
      callbackData: [...Object.values(SkinTestEnums.TYPES)],
      getMarkupTargetKey: (callback: string): string => {
        return callback.split('_')[0].toUpperCase();
      },
    },
    {
      callbackData: [
        SkinTestEnums.BUTTONS.CLOSE,
        SkinTestEnums.BUTTONS.BACK,
        SkinTestEnums.PORES.FAT_BLAZE.YES,
        SkinTestEnums.PORES.FAT_BLAZE.NO,
        SkinTestEnums.PORES.T_ZONE.DRY_PEEL.YES,
        SkinTestEnums.PORES.T_ZONE.DRY_PEEL.NO,
        SkinTestEnums.PORES.UNNOTICED.ARE_CAMEDONES.YES,
        SkinTestEnums.PORES.UNNOTICED.DRY_TIGHT.YES,
        SkinTestEnums.PORES.UNNOTICED.DRY_TIGHT.NO,
        SkinTestEnums.PORES.INVISIBLE.SENSITIVITY_REDNESS.YES,
        SkinTestEnums.PORES.INVISIBLE.DULL_WRINKLES.NO,
        SkinTestEnums.PORES.INVISIBLE.DULL_WRINKLES.YES,
        SkinTestEnums.RASH.DRY_PEEL.YES,
        SkinTestEnums.RASH.DRY_PEEL.NO,
        SkinTestEnums.RASH.DRY_PEEL_T_ZONE_1.YES,
        SkinTestEnums.RASH.DRY_PEEL_T_ZONE_1.NO,
        SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2.YES,
        SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH.ABOUT_1_2,
        SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH.FEW,
        SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH.UNDER_10,
        ...getAllComplexSizeCallbacks(),
        ...getAllCompositionCallbacks(),
        ...getAllUsageCallbacks(),
        ...getAllRecommendationsCallbacks(),
        ...getAllSkinSubtypes(),
      ],
    },
  ],
};

function getAllSkinSubtypes(): string[] {
  return Object.values(SkinTestEnums.SUBTYPES)
    .map((value) => Object.values(value))
    .flat();
}

function getAllResultCallbacks(): string[] {
  const skinTestResultCallbacksAsStrings: string[] =
    Object.keys(SkinTestResultTitles);
  skinTestResultCallbacksAsStrings.forEach(
    (resultStringCallback: string): void => {
      if (
        !DataUtils.isStringInUnionType(skinTestResultCallbacksAsStrings)(
          resultStringCallback
        )
      ) {
        throw new Error(NOT_IN_UNION_TYPE(resultStringCallback));
      }
    }
  );
  return skinTestResultCallbacksAsStrings;
}

function getAllRecommendationsCallbacks(): string[] {
  return [
    ...getAllResultCallbacks().map(
      (item: string): string => item + '_maxi_recommendations'
    ),
    ...getAllResultCallbacks().map(
      (item: string): string => item + '_mini_recommendations'
    ),
  ];
}

function getAllUsageCallbacks(): string[] {
  return [
    ...getAllResultCallbacks().map(
      (item: string): string => item + '_mini_usage'
    ),
    ...getAllResultCallbacks().map(
      (item: string): string => item + '_maxi_usage'
    ),
  ];
}

function getAllCompositionCallbacks(): string[] {
  return [
    ...getAllResultCallbacks().map(
      (item: string): string => item + '_mini_composition'
    ),
    ...getAllResultCallbacks().map(
      (item: string): string => item + '_maxi_composition'
    ),
  ];
}

function getAllComplexSizeCallbacks(): string[] {
  return [
    ...getAllResultCallbacks().map((item: string): string => item + '_mini'),
    ...getAllResultCallbacks().map((item: string): string => item + '_maxi'),
  ];
}

export { getAllResultCallbacks as getAllSkinTestResultCallbacks };
export { getAllComplexSizeCallbacks as getAllSkinTestComplexSizeCallbacks };
export { getAllCompositionCallbacks as getAllSkinTestCompositionCallbacks };
export { getAllUsageCallbacks as getAllSkinTestUsageCallbacks };
export { getAllRecommendationsCallbacks as getAllSkinTestRecommendationsCallbacks };
