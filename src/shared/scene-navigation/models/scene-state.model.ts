import { NAVIGATION_CALLBACK, SCENE_ID } from '@models';

export type CallbacksHistoryType = NAVIGATION_CALLBACK | string;

export interface GlobalStateItem {
  callbacksHistory: CallbacksHistoryType[];
  messageId: number;
}

export interface GlobalState {
  [SCENE_ID.RECIPES]: GlobalStateItem;
  [SCENE_ID.TIPS]: GlobalStateItem;
  [SCENE_ID.SKIN_TYPE_TEST]: GlobalStateItem;
}
