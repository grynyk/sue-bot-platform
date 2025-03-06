import { Markup } from 'telegraf';
import { SkincareProduct, TestAnswer, TestQuestion } from '../models/skin-type-test.model';
import { InlineKeyboardButton } from 'typegram';
import { NAVIGATION_CALLBACK, NAVIGATION_ICON } from 'src/models';
import { PRODUCT_SIZE } from '../enums/skin-test.enum';
import { SKINCARE } from '../constants/skincare.constant';

export function getQuestionKeyboard(question: TestQuestion): ReturnType<typeof Markup.inlineKeyboard> {
  const navigationButton: InlineKeyboardButton.CallbackButton =
    question.id === 1
      ? Markup.button.callback(NAVIGATION_ICON.CLOSE, NAVIGATION_CALLBACK.CLOSE)
      : Markup.button.callback(NAVIGATION_ICON.BACK, NAVIGATION_CALLBACK.BACK);
  const buttons: InlineKeyboardButton.CallbackButton[] = question.answers.map(
    (answer: TestAnswer): InlineKeyboardButton.CallbackButton => Markup.button.callback(answer.text, `ANSWER_${answer.id}`)
  );
  return Markup.inlineKeyboard([...buttons, navigationButton], {
    columns: 1,
  });
}

export function getResultProductSizeKeyboard(answer: TestAnswer): ReturnType<typeof Markup.inlineKeyboard> {
  const buttons: InlineKeyboardButton.CallbackButton[] = [
    Markup.button.callback(SKINCARE.LABELS.MINI, `RESULT_MINI_${answer.id}`),
    Markup.button.callback(SKINCARE.LABELS.MAXI, `RESULT_MAXI_${answer.id}`),
    Markup.button.callback(NAVIGATION_ICON.BACK, NAVIGATION_CALLBACK.BACK)
  ];
  return Markup.inlineKeyboard(buttons, {
    columns: 2,
  });
}

export function getResultProductKeyboard(product: SkincareProduct, answerId: number, PRODUCT_SIZE: PRODUCT_SIZE): ReturnType<typeof Markup.inlineKeyboard> {
  const buttons: InlineKeyboardButton[] = [
    Markup.button.url(SKINCARE.LABELS.ORDER, product.url),
    Markup.button.callback(SKINCARE.LABELS.INGREDIENTS, `RESULT_${PRODUCT_SIZE}_INGREDIENTS_${answerId}`),
    Markup.button.callback(SKINCARE.LABELS.ROUTINE, `RESULT_${PRODUCT_SIZE}_ROUTINE_${answerId}`),
    Markup.button.callback(SKINCARE.LABELS.RECOMMENDATIONS, `RESULT_${PRODUCT_SIZE}_RECOMMENDATIONS_${answerId}`),
    Markup.button.url(SKINCARE.LABELS.CONSULTATION, 'https://suemade.com/consultation/'),
    Markup.button.callback(NAVIGATION_ICON.BACK, NAVIGATION_CALLBACK.BACK),
    Markup.button.callback(NAVIGATION_ICON.CLOSE, NAVIGATION_CALLBACK.CLOSE)
  ];
  return Markup.inlineKeyboard(buttons, {
    columns: 1,
  });
}