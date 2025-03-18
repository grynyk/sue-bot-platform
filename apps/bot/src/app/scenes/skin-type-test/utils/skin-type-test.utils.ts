import { QUESTIONS } from '../constants/questions.constant';
import { SKINCARE } from '../constants/skincare.constant';
import { SkincareProduct, TestAnswer, TestQuestion, TestResult } from '../models/skin-type-test.model';

export function getQuestion(id: number): TestQuestion | null {
  return QUESTIONS.find((question: TestQuestion): boolean => question.id === id) || null;
}

export function getAnswer(id: number): TestAnswer | null {
  const answer: TestAnswer = QUESTIONS.flatMap((question: TestQuestion): TestAnswer[] => question.answers).find(
    (answer: TestAnswer) => answer.id === id
  );
  return answer || null;
}

export function getResultProductSizeCaption(result: string): string {
  return `Вітаємо! Твій тип шкіри визначено:\n<strong>${result}</strong>.\n\nМи підготували для тебе два комплекси:\nміні (малі об'єми засобів) та максі (великі об'єми).\nОбирай свій 🙂`;
}

export function getResultProductCaption(result: TestResult, product: SkincareProduct): string {
  return `<strong>${result.title}</strong>\nКомплекс <a href='${product.url}'><strong>${SKINCARE.LOCALIZATION_STRINGS[product.size].toLowerCase()}</strong></a> 💫`;
}
