import { Scenes } from 'telegraf';

export enum SCENE_ID {
  RECIPES = 'RECIPES_SCENE',
  TIPS = 'TIPS_SCENE',
  SKIN_TYPE_TEST = 'SKIN_TYPE_TEST_SCENE',
}

export interface SceneContext extends Scenes.SceneContext {
  match?: RegExpExecArray;
}
