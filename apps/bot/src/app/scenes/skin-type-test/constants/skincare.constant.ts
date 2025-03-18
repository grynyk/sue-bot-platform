import { PRODUCT_DETAILS, PRODUCT_SIZE, SEASON } from '../enums/skin-test.enum';

export const SKINCARE: {
  LOCALIZATION_STRINGS: Record<string, string>;
} = {
  LOCALIZATION_STRINGS: {
    DEFAULT_QUESTION: 'Виберіть один з варіантів:',
    ERROR: 'Виникла помилка. Спробуйте ще раз.',
    ORDER: 'Замовити',
    CONSULTATION: 'Консультація з косметологом',
    [PRODUCT_SIZE.MINI]: 'Міні',
    [PRODUCT_SIZE.MAXI]: 'Максі',
    [SEASON.WINTER]: 'Зимовий',
    [SEASON.SUMMER]: 'Літній',
    [PRODUCT_DETAILS.RECOMMENDATIONS]: 'Рекомендації',
    [PRODUCT_DETAILS.INGREDIENTS]: 'Що входить?',
    [PRODUCT_DETAILS.ROUTINE]: 'Спосіб використання',
  },
};
