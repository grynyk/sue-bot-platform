import { BINARY_ANSWER } from '../enums/skin-test.enum';
import { TestQuestion } from '../models/skin-type-test.model';

export const QUESTIONS: TestQuestion[] = [
  {
    id: 1,
    text: 'Чи знаєш ти свій тип шкіри?',
    answers: [
      { id: 101, text: BINARY_ANSWER.YES, next: 2 },
      { id: 102, text: BINARY_ANSWER.NO, next: 3 },
    ],
  },
  {
    id: 2,
    text: 'Чи хочеш перевірити?',
    answers: [
      { id: 103, text: BINARY_ANSWER.YES, next: 4 },
      { id: 104, text: BINARY_ANSWER.NO, next: 6 },
    ],
  },
  {
    id: 3,
    text: 'Скільки тобі років?',
    answers: [
      { id: 105, text: 'До 15', next: 5 },
      { id: 106, text: '16-45', next: 4 },
      { id: 107, text: '45+', next: 12 },
    ],
  },
  {
    id: 4,
    text: 'Чи бувають у тебе висипання?',
    answers: [
      { id: 108, text: BINARY_ANSWER.YES, next: 16 },
      { id: 109, text: BINARY_ANSWER.NO, next: 13 },
    ],
  },
  {
    id: 5,
    text: 'Чи бувають у тебе висипання?',
    answers: [
      { id: 110, text: BINARY_ANSWER.YES, next: null, result: 'Підліткова шкіра з висипаннями' },
      { id: 111, text: BINARY_ANSWER.NO, next: null, result: 'Підліткова шкіра без висипань' },
    ],
  },
  {
    id: 6,
    text: 'Обери свій тип шкіри:',
    answers: [
      { id: 112, text: 'Нормальний тип', next: 7 },
      { id: 113, text: 'Комбінований тип', next: 8 },
      { id: 114, text: 'Жирний тип', next: 9 },
      { id: 115, text: 'Сухий тип', next: null, result: 'Сухий тип шкіри' },
      { id: 116, text: 'Зріла шкіра (45+)', next: 10 },
      { id: 117, text: 'Підліткова шкіра', next: 11 },
    ],
  },
  {
    id: 7,
    text: 'Нормальний тип шкіри:',
    answers: [
      { id: 118, text: 'Здоровий нормальний тип шкіри', next: null, result: 'Нормальний тип шкіри' },
      { id: 119, text: 'Нормальний тип шкіри з чорними цятками', next: null, result: 'Нормальний тип шкіри з чорними цятками' },
    ],
  },
  {
    id: 8,
    text: 'Комбінований тип шкіри:',
    answers: [
      { id: 120, text: 'Здоровий комбінований тип шкіри', next: null, result: 'Комбінований тип шкіри' },
      { id: 121, text: 'Комбінований тип шкіри з висипаннями', next: null, result: 'Комбінований тип шкіри з висипаннями' },
      { id: 122, text: 'Комбінований тип шкіри зі зневодненням', next: null, result: 'Комбінований тип шкіри зі зневодненням' },
    ],
  },
  {
    id: 9,
    text: 'Жирний тип шкіри:',
    answers: [
      { id: 123, text: 'Здоровий жирний тип шкіри', next: null, result: 'Жирний тип шкіри' },
      { id: 124, text: 'Жирний тип шкіри з висипаннями', next: null, result: 'Жирний тип шкіри з висипаннями' },
      { id: 125, text: 'Жирний тип шкіри зі зневодненням', next: null, result: 'Жирний тип шкіри зі зневодненням' },
      { id: 126, text: 'Жирний тип шкіри із блиском', next: null, result: 'Жирний тип шкіри із блиском' },
    ],
  },
  {
    id: 10,
    text: 'Зріла шкіра:',
    answers: [
      { id: 127, text: 'Зріла шкіра нормального типу', next: null, result: 'Зріла шкіра нормального типу' },
      { id: 128, text: 'Зріла шкіра сухого типу', next: null, result: 'Зріла шкіра сухого типу' },
      { id: 129, text: 'Зріла шкіра жирного та комбінованого типів', next: null, result: 'Зріла шкіра жирного та комбінованого типів' },
    ],
  },
  {
    id: 11,
    text: 'Підліткова шкіра:',
    answers: [
      { id: 130, text: 'Підліткова шкіра з висипаннями', next: null, result: 'Підліткова шкіра з висипаннями' },
      { id: 131, text: 'Підліткова шкіра без висипань', next: null, result: 'Підліткова шкіра без висипань' },
    ],
  },
  {
    id: 12,
    text: 'Чи є у тебе пори на обличчі?',
    answers: [
      { id: 132, text: 'Так, є по всьому обличчі/Т-зоні', next: null, result: 'Зріла шкіра комбінованого типу' },
      { id: 133, text: 'Ледь помітні в поодиноких місцях', next: null, result: 'Зріла шкіра нормального типу' },
      { id: 134, text: 'Взагалі немає', next: null, result: 'Зріла шкіра сухого типу' },
    ],
  },
  {
    id: 13,
    text: 'Чи є у тебе пори на обличчі?',
    answers: [
      { id: 135, text: 'Так, є по всьому обличчі', next: null, result: 'Жирний тип шкіри' },
      { id: 136, text: 'Є лише у Т-зоні', next: 14 },
      { id: 137, text: 'Ледь помітні в поодиноких місцях', next: 15 },
      { id: 138, text: 'Взагалі немає', next: null, result: 'Сухий тип шкіри' },
    ],
  },
  {
    id: 14,
    text: 'Чи присутні сухість та лущення?',
    answers: [
      { id: 139, text: BINARY_ANSWER.YES, next: null, result: 'Комбінований тип шкіри зі зневодненням' },
      { id: 140, text: BINARY_ANSWER.NO, next: null, result: 'Комбінований тип шкіри' },
    ],
  },
  {
    id: 15,
    text: 'Чи є у тебе чорні цятки на обличчі?',
    answers: [
      { id: 141, text: BINARY_ANSWER.YES, next: null, result: 'Нормальний тип шкіри з чорними цятками' },
      { id: 142, text: BINARY_ANSWER.NO, next: null, result: 'Нормальний тип шкіри' },
    ],
  },
  {
    id: 16,
    text: 'Як багато у тебе висипань?',
    answers: [
      { id: 143, text: 'Більше 10 водночас', next: 17 },
      { id: 144, text: 'Менше 10 водночас', next: 18 },
    ],
  },
  {
    id: 17,
    text: 'Чи є у тебе пори на обличчі?',
    answers: [
      { id: 145, text: 'Так, є по всьому обличчі', next: 19 },
      { id: 146, text: 'Лише в Т-зоні', next: 20 },
    ],
  },
  {
    id: 18,
    text: 'Чи є у тебе пори на обличчі?',
    answers: [
      { id: 147, text: 'Так, є по всьому обличчі', next: 19 },
      { id: 148, text: 'Лише в Т-зоні', next: 20 },
      { id: 149, text: 'Ледь помітні в поодиноких місцях', next: 21 },
    ],
  },
  {
    id: 19,
    text: `Чи з'являється жирний блиск протягом дня?`,
    answers: [
      { id: 150, text: BINARY_ANSWER.YES, next: 22 },
      { id: 151, text: BINARY_ANSWER.NO, next: 22 },
    ],
  },
  {
    id: 20,
    text: `Чи з'являється жирний блиск протягом дня?`,
    answers: [
      { id: 152, text: BINARY_ANSWER.YES, next: 23 },
      { id: 153, text: BINARY_ANSWER.NO, next: 23 },
    ],
  },
  {
    id: 21,
    text: 'Чи є у тебе чорні цятки на обличчі?',
    answers: [
      { id: 154, text: BINARY_ANSWER.YES, next: null, result: 'Нормальний тип шкіри з чорними цятками' },
      { id: 155, text: BINARY_ANSWER.NO, next: null, result: 'Нормальний тип шкіри' },
    ],
  },
  {
    id: 22,
    text: 'Чи присутні сухість та лущення?',
    answers: [
      { id: 156, text: BINARY_ANSWER.YES, next: null, result: 'Жирний тип шкіри зі зневодненням' },
      { id: 157, text: BINARY_ANSWER.NO, next: null, result: 'Жирний тип шкіри з висипаннями' },
    ],
  },
  {
    id: 23,
    text: 'Чи присутні сухість та лущення?',
    answers: [
      { id: 158, text: BINARY_ANSWER.YES, next: null, result: 'Комбінований тип шкіри зі зневодненням' },
      { id: 159, text: BINARY_ANSWER.NO, next: null, result: 'Комбінований тип шкіри з висипаннями' },
    ],
  },
];
