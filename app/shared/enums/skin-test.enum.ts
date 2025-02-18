import { SkinTestResultCallbacks } from '../../models';

export namespace SkinTestEnums {
  export enum KNOWN_TYPE {
    KNOWN = 'known_skin_type',
    UNKNOWN = 'unknown_skin_type',
  }
  export enum WANNA_CHECK {
    YES = 'yes_wanna_check',
    NO = 'no_wanna_check',
  }
  export enum YOUR_AGE {
    BEFORE_15 = 'before_15_age',
    BETWEEN_16_45 = 'between_16_45_age',
    AFTER_45 = 'after_45_age',
  }
  export enum TYPES {
    NORMAL = 'normal_skin_type',
    FAT = 'fat_skin_type',
    DRY = 'dry_skin_type',
    COMBINED = 'combined_skin_type',
    TEENAGE = 'teenage_skin_type',
    MATURE = 'mature_skin_type',
  }

  export namespace SUBTYPES {
    export enum FAT {
      GOOD = 'fat_good_skin_subtype',
      RASH_BLAZE = 'fat_rash_blaze_skin_subtype',
      DRY = 'fat_dry_skin_subtype',
    }
    export enum NORMAL {
      DRY = 'normal_dry_skin_subtype',
      RASH = 'normal_rash_skin_subtype',
      GOOD = 'normal_good_skin_subtype',
    }
    export enum DRY {
      DULL_WRINKLES = 'dry_dull_wrinkles_skin_subtype',
      REDNESS = 'dry_redness_skin_subtype',
      GOOD = 'dry_good_skin_subtype',
    }
    export enum COMBINED {
      DRY = 'combined_dry_skin_subtype',
      GOOD = 'combined_good_skin_subtype',
      RASH_BLAZE = 'combined_rash_blaze_skin_subtype',
    }
    export enum TEENAGE {
      RASH = 'teenage_rash_skin_subtype',
      GOOD = 'teenage_good_skin_subtype',
    }
    export enum MATURE {
      DRY = 'mature_dry_skin_subtype',
      AGING = 'mature_aging_skin_subtype',
      DULL = 'mature_dull_skin_subtype',
    }
  }

  export namespace PORES {
    export enum IF_ARE {
      YES = 'yes_pores',
      NO = 'no_pores',
    }
    export enum WHERE_ARE {
      T_ZONE = 't_zone_pores',
      UNNOTICED = 'unnoticed_pores',
      INVISIBLE = 'invisible_pores',
    }
    export enum FAT_BLAZE {
      YES = 'yes_pores_fat_blaze',
      NO = 'no_pores_fat_blaze',
    }
    export namespace T_ZONE {
      export enum FAT_BLAZE {
        YES = 'yes_pores_t_zone_fat_blaze',
        NO = 'no_pores_t_zone_fat_blaze',
      }
      export enum DRY_PEEL {
        YES = 'yes_pores_t_zone_dry_peel',
        NO = 'no_pores_t_zone_dry_peel',
      }
    }
    export namespace UNNOTICED {
      export enum ARE_CAMEDONES {
        YES = 'yes_pores_unnoticed_comedones',
        NO = 'no_pores_unnoticed_comedones',
      }
      export enum DRY_TIGHT {
        YES = 'no_pores_unnoticed_dry_tight',
        NO = 'no_pores_dry_tight',
      }
    }
    export namespace INVISIBLE {
      export enum SENSITIVITY_REDNESS {
        YES = 'yes_pores_invisible_sensitivity_redness',
        NO = 'no_pores_invisible_sensitivity_redness',
      }
      export enum DULL_WRINKLES {
        YES = 'yes_pores_invisible_dull_wrinkles',
        NO = 'no_pores_invisible_dull_wrinkles',
      }
    }
  }

  export namespace RASH {
    export enum IF_ARE {
      YES = 'yes_rash',
      NO = 'no_rash',
    }
    export enum HOW_MUCH {
      MORE_10 = 'more_10_rash',
      LESS_10 = 'less_10_rash',
    }
    export enum ARE_PORES {
      YES = 'yes_rash_pores',
      NO = 'no_rash_pores',
    }
    export enum FAT_BLAZE_T_ZONE {
      YES = 'yes_rash_fat_blaze_t_zone',
      NO = 'no_rash_fat_blaze_t_zone',
    }
    export enum DRY_PEEL_T_ZONE_1 {
      YES = 'yes_rash_dry_peel_t_zone_1',
      NO = 'no_rash_dry_peel_t_zone_1',
    }
    export enum DRY_PEEL_T_ZONE_2 {
      YES = 'yes_rash_dry_peel_t_zone_2',
      NO = 'no_rash_dry_peel_t_zone_2',
    }
    export enum DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH {
      ABOUT_1_2 = 'rash_dry_peel_t_zone_2_how_often_about_1_2',
      UNDER_10 = 'rash_dry_peel_t_zone_2_how_often_under_10',
      FEW = 'rash_dry_peel_t_zone_2_how_often_few',
    }
    export enum FAT_BLAZE {
      YES = 'yes_rash_fat_blaze',
      NO = 'no_rash_fat_blaze',
    }
    export enum DRY_PEEL {
      YES = 'yes_rash_dry_peel',
      NO = 'no_rash_dry_peel',
    }
  }

  export enum BUTTONS {
    BACK = 'back',
    CLOSE = 'close',
  }

  export enum CAPTIONS {
    DEFAULT = 'Вибери один з варіантів',
    TYPES = 'Обери свій тип шкіри',
    WANNA_CHECK = 'Чи хочеш перевірити?',
    KNOWN_TYPE = 'Чи знаєш ти свій тип шкіри?',
    YOUR_AGE = 'Скільки тобі років?',
    MAIN_PROBLEM = 'Яка твоя основна проблема?',
    IS_RASH = 'Чи бувають у тебе висипання?',
    RASH_HOW_MUCH = 'Як багато в тебе висипань?',
    RASH_ARE_PORES = 'Чи є у тебе розширені пори по всьому обличчі?',
    RASH_FAT_BLAZE_T_ZONE = 'Чи з`являється жирний блиск протягом дня в т-зоні?',
    RASH_DRY_PEEL_T_ZONE_1 = 'Чи присутні сухість/лущення?',
    RASH_DRY_PEEL_T_ZONE_2 = 'Чи присутні сухість/лущення?',
    RASH_DRY_PEEL_T_ZONE_2_HOW_OFTEN = 'Як часто бувають висипання і як багато?',
    RASH_FAT_BLAZE = 'Чи з`являється жирний блиск протягом дня?',
    RASH_DRY_PEEL = 'Чи присутні сухість/лущення?',
    ARE_PORES = 'Чи є у тебе розширені пори по всьому обличчі?',
    WHERE_ARE_PORES = 'На яких ділянках обличчя присутні розширені пори?',
    PORES_IS_FAT_BLAZE = 'Чи буває в тебе жирний блиск на шкірі протягом дня?',
    PORES_T_ZONE_IS_FAT_BLAZE = 'Чи з`являється жирний блиск протягом дня в т-зоні?',
    PORES_T_ZONE_IS_DRY_PEEL = 'Чи присутні сухість/лущення?',
    PORES_UNNOTICED_ARE_CAMEDONES = 'Чи присутні закриті камедони?',
    PORES_UNNOTICED_DRY_TIGHT = 'Чи відчуваєте сухість/стягнення шкіри?',
    PORES_INVISIBLE_SENSITIVITY_REDNESS = 'Чи є чутливість та схильність до почервонінь?',
    PORES_INVISIBLE_DULL_WRINKLES = 'Чи присутній тьмяний колір обличчя та дрібні зморшки?',
  }

  export enum MarkupKeys {
    WANNA_CHECK = 'WANNA_CHECK',
    TYPES = 'TYPES',
    YOUR_AGE = 'YOUR_AGE',
    TEENAGE = 'TEENAGE',
    MATURE = 'MATURE',
    IS_RASH = 'IS_RASH',
    ARE_PORES = 'ARE_PORES',
    RASH_HOW_MUCH = 'RASH_HOW_MUCH',
    RASH_ARE_PORES = 'RASH_ARE_PORES',
    RASH_FAT_BLAZE_T_ZONE = 'RASH_FAT_BLAZE_T_ZONE',
    RASH_FAT_BLAZE = 'RASH_FAT_BLAZE',
    RASH_DRY_PEEL = 'RASH_DRY_PEEL',
    RASH_DRY_PEEL_T_ZONE_1 = 'RASH_DRY_PEEL_T_ZONE_1',
    RASH_DRY_PEEL_T_ZONE_2 = 'RASH_DRY_PEEL_T_ZONE_2',
    RASH_DRY_PEEL_T_ZONE_2_HOW_OFTEN = 'RASH_DRY_PEEL_T_ZONE_2_HOW_OFTEN',
    WHERE_ARE_PORES = 'WHERE_ARE_PORES',
    PORES_IS_FAT_BLAZE = 'PORES_IS_FAT_BLAZE',
    PORES_T_ZONE_IS_FAT_BLAZE = 'PORES_T_ZONE_IS_FAT_BLAZE',
    PORES_T_ZONE_IS_DRY_PEEL = 'PORES_T_ZONE_IS_DRY_PEEL',
    PORES_UNNOTICED_ARE_CAMEDONES = 'PORES_UNNOTICED_ARE_CAMEDONES',
    PORES_UNNOTICED_DRY_TIGHT = 'PORES_UNNOTICED_DRY_TIGHT',
    PORES_INVISIBLE_SENSITIVITY_REDNESS = 'PORES_INVISIBLE_SENSITIVITY_REDNESS',
    PORES_INVISIBLE_DULL_WRINKLES = 'PORES_INVISIBLE_DULL_WRINKLES',
  }
}

export const SkinTestResultTitles: Record<SkinTestResultCallbacks, string> = {
  [SkinTestEnums.SUBTYPES.TEENAGE.GOOD]: 'Здорова підліткова шкіра',
  [SkinTestEnums.SUBTYPES.TEENAGE.RASH]: 'Підліткова шкіра з висипаннями',
  [SkinTestEnums.PORES.INVISIBLE.DULL_WRINKLES.NO]: 'Сухий тип шкіри',
  [SkinTestEnums.SUBTYPES.DRY.GOOD]: 'Сухий тип шкіри',
  [SkinTestEnums.SUBTYPES.DRY.REDNESS]:
    'Сухий тип шкіри схильний до почервонінь',
  [SkinTestEnums.PORES.INVISIBLE.DULL_WRINKLES.YES]:
    'Сухий тип шкіри з тьмяним кольором та дрібними зморшками',
  [SkinTestEnums.SUBTYPES.DRY.DULL_WRINKLES]:
    'Сухий тип шкіри з тьмяним кольором та дрібними зморшками',
  [SkinTestEnums.PORES.T_ZONE.DRY_PEEL.YES]:
    'Комбінований тип шкіри зі зневодненням',
  [SkinTestEnums.RASH.DRY_PEEL_T_ZONE_1.YES]:
    'Комбінований тип шкіри зі зневодненням',
  [SkinTestEnums.SUBTYPES.COMBINED.DRY]:
    'Комбінований тип шкіри зі зневодненням',
  [SkinTestEnums.PORES.T_ZONE.DRY_PEEL.NO]: 'Здоровий комбінований тип шкіри',
  [SkinTestEnums.SUBTYPES.COMBINED.GOOD]: 'Здоровий комбінований тип шкіри',
  [SkinTestEnums.SUBTYPES.COMBINED.RASH_BLAZE]:
    'Комбінований тип шкіри з висипанням',
  [SkinTestEnums.PORES.UNNOTICED.DRY_TIGHT.YES]:
    'Нормальний тип шкіри зі зневодненням',
  [SkinTestEnums.SUBTYPES.NORMAL.DRY]: 'Нормальний тип шкіри зі зневодненням',
  [SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH.FEW]:
    'Нормальний тип шкіри схильний до висипань',
  [SkinTestEnums.PORES.UNNOTICED.ARE_CAMEDONES.YES]:
    'Нормальний тип шкіри схильний до висипань',
  [SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2.YES]:
    'Жирний тип шкіри зі зневодненням',
  [SkinTestEnums.RASH.DRY_PEEL.YES]: 'Жирний тип шкіри зі зневодненням',
  [SkinTestEnums.SUBTYPES.FAT.DRY]: 'Жирний тип шкіри зі зневодненням',
  [SkinTestEnums.RASH.DRY_PEEL.NO]: 'Жирний тип шкіри з висипаннями',
  [SkinTestEnums.SUBTYPES.FAT.RASH_BLAZE]: 'Жирний тип шкіри з висипаннями',
  [SkinTestEnums.SUBTYPES.MATURE.DRY]: 'Зріла шкіра сухого типу',
  [SkinTestEnums.SUBTYPES.MATURE.AGING]: 'Зріла шкіра нормального типу',
  [SkinTestEnums.SUBTYPES.MATURE.DULL]:
    'Зріла шкіра з сірим тьмяним кольором обличчя',
  [SkinTestEnums.PORES.FAT_BLAZE.YES]: 'Здоровий жирний тип шкіри',
  [SkinTestEnums.PORES.FAT_BLAZE.NO]: 'Здоровий жирний тип шкіри',
  [SkinTestEnums.SUBTYPES.FAT.GOOD]: 'Здоровий жирний тип шкіри',
  [SkinTestEnums.PORES.INVISIBLE.SENSITIVITY_REDNESS.YES]:
    'Сухий чутливий тип шкіри схильний до почервонінь',
  [SkinTestEnums.RASH.DRY_PEEL_T_ZONE_1.NO]:
    'Комбінований тип шкіри з висипаннями',
  [SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH.UNDER_10]:
    'Комбінований тип шкіри з висипаннями',
  [SkinTestEnums.PORES.UNNOTICED.DRY_TIGHT.NO]: 'Здоровий нормальний тип шкіри',
  [SkinTestEnums.SUBTYPES.NORMAL.GOOD]: 'Здоровий нормальний тип шкіри',
  [SkinTestEnums.RASH.DRY_PEEL_T_ZONE_2_HOW_OFTEN_RASH.ABOUT_1_2]:
    'Здоровий нормальний тип шкіри',
};

export enum SkinTestResultInfoKeys {
  Usage = 'usage',
  Composition = 'composition',
  Recommendations = 'recommendations',
}

export enum YearSeasonComplex {
  Winter = 'winterComplex',
  Summer = 'summerComplex',
}

export enum ComplexSizeEnum {
  mini = 'mini',
  maxi = 'maxi',
}
