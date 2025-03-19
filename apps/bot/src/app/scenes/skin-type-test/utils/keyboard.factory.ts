import { Markup } from 'telegraf';
import { SkincareProduct, TestAnswer, TestQuestion } from '../models/skin-type-test.model';
import { InlineKeyboardButton } from 'typegram';
import { PRODUCT_SIZE } from '@sue-bot-platform/api';
import { SKINCARE } from '../constants/skincare.constant';
import { backButton, closeButton } from '../../../utils/keyboard.utils';

export function getQuestionKeyboard(question: TestQuestion): ReturnType<typeof Markup.inlineKeyboard> {
  const navigationButton: InlineKeyboardButton.CallbackButton = question.id === 1 ? closeButton : backButton;
  const buttons: InlineKeyboardButton.CallbackButton[] = question.answers.map(
    (answer: TestAnswer): InlineKeyboardButton.CallbackButton => Markup.button.callback(answer.text, `ANSWER_${answer.id}`)
  );
  return Markup.inlineKeyboard([...buttons, navigationButton], {
    columns: 1,
  });
}

export function getResultProductSizeKeyboard(answer: TestAnswer): ReturnType<typeof Markup.inlineKeyboard> {
  const buttons: InlineKeyboardButton.CallbackButton[] = [
    Markup.button.callback(SKINCARE.LOCALIZATION_STRINGS.MINI, `RESULT_MINI_${answer.id}`),
    Markup.button.callback(SKINCARE.LOCALIZATION_STRINGS.MAXI, `RESULT_MAXI_${answer.id}`),
    backButton,
  ];
  return Markup.inlineKeyboard(buttons, {
    columns: 2,
  });
}

export function getResultProductKeyboard(
  product: SkincareProduct,
  answerId: number,
  PRODUCT_SIZE: PRODUCT_SIZE
): ReturnType<typeof Markup.inlineKeyboard> {
  const buttons: InlineKeyboardButton[] = [
    Markup.button.url(SKINCARE.LOCALIZATION_STRINGS.ORDER, product.url),
    Markup.button.callback(SKINCARE.LOCALIZATION_STRINGS.INGREDIENTS, `RESULT_${PRODUCT_SIZE}_INGREDIENTS_${answerId}`),
    Markup.button.callback(SKINCARE.LOCALIZATION_STRINGS.ROUTINE, `RESULT_${PRODUCT_SIZE}_ROUTINE_${answerId}`),
    Markup.button.callback(SKINCARE.LOCALIZATION_STRINGS.RECOMMENDATIONS, `RESULT_${PRODUCT_SIZE}_RECOMMENDATIONS_${answerId}`),
    Markup.button.url(SKINCARE.LOCALIZATION_STRINGS.CONSULTATION, 'https://suemade.com/consultation/'),
    backButton,
    closeButton,
  ];
  return Markup.inlineKeyboard(buttons, {
    columns: 1,
  });
}
