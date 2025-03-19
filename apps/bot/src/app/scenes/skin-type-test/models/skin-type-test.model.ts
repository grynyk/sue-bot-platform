import { BINARY_ANSWER } from '../enums/skin-test.enum';
import { PRODUCT_SIZE, SEASON } from '@sue-bot-platform/api';
export interface TestAnswer {
  id: number;
  text: BINARY_ANSWER | string;
  next: number;
  result?: string;
}

export interface TestQuestion {
  id: number;
  text: string;
  answers: TestAnswer[];
}

export interface SkincareProduct {
  season: SEASON;
  size: PRODUCT_SIZE;
  image: string;
  url: string;
  recommendations: string;
  ingredients: string;
  routine: string;
}

export interface TestResult {
  answerIds: number[];
  title: string;
  products: SkincareProduct[];
}
