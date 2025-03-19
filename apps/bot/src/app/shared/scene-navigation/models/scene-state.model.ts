import { NAVIGATION_CALLBACK } from '../../../models/navigation.model';

export type CallbacksHistoryType = NAVIGATION_CALLBACK | string;

export interface SceneStateItem {
  callbacksHistory: CallbacksHistoryType[];
  messageId: number;
}

