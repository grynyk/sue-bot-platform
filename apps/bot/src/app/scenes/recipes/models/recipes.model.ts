import { NAVIGATION_CALLBACK } from '../../../models/navigation.model';
import { RECIPES_MAIN_BUTTON_CALLBACK } from '../enums/recipes.enum';

export interface RecipesCallbacks {
  MAIN: typeof RECIPES_MAIN_BUTTON_CALLBACK;
}

export interface RecipiesLabels {
  MAIN: Record<RECIPES_MAIN_BUTTON_CALLBACK, string>;
}

export interface RecipiesResponses {
  MAIN: Record<RECIPES_MAIN_BUTTON_CALLBACK, string>;
}

export interface RecipesSceneStructure {
  CALLBACKS: RecipesCallbacks;
  LABELS: RecipiesLabels;
  RESPONSES: RecipiesResponses;
}

export type RecipesSceneContextType = NAVIGATION_CALLBACK | RECIPES_MAIN_BUTTON_CALLBACK;
