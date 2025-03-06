import { Injectable } from '@nestjs/common';
import { dropRight, isNil, last, uniq } from 'lodash';
import { GlobalStateItem } from '../models/scene-state.model';
import { NAVIGATION_CALLBACK } from '@models/navigation.model';
import { SCENE_ID, SceneContext } from '@models/scenes.model';

@Injectable()
export class SceneStateService {
  private readonly userState: Map<number, Record<SCENE_ID, GlobalStateItem>> = new Map<number, Record<SCENE_ID, GlobalStateItem>>();
  private sceneId: SCENE_ID;
  private userId: number;

  setContext(ctx: SceneContext, sceneId: SCENE_ID): void {
    this.sceneId = sceneId;
    this.userId = ctx.from.id;
  }

  getSceneData(): GlobalStateItem {
    return this.ensureSceneData();
  }

  setSceneData(data: Partial<GlobalStateItem>): void {
    const session = this.ensureSceneData();
    Object.assign(session, data);
  }

  resetScene(): void {
    if (!this.userState.has(this.userId)) {
      return;
    }
    this.userState.get(this.userId)[this.sceneId] = { callbacksHistory: [NAVIGATION_CALLBACK.START], messageId: null };
  }

  getAllScenes(): Record<SCENE_ID, GlobalStateItem> | undefined {
    return this.userState.get(this.userId);
  }

  setMessageId(messageId: number): void {
    const session: GlobalStateItem = this.getSceneData();
    session.messageId = messageId;
  }

  getMessageId(): number | undefined {
    const session: GlobalStateItem = this.getSceneData();
    return session.messageId;
  }

  storeCallback(step: string): void {
    const session: GlobalStateItem = this.getSceneData();
    session.callbacksHistory = uniq([...session.callbacksHistory, step]);
  }

  getPreviousCallback(): string | null {
    const session: GlobalStateItem = this.getSceneData();
    session.callbacksHistory = dropRight(session.callbacksHistory);
    return last(session.callbacksHistory) ?? null;
  }

  getHistory(): string[] {
    const session: GlobalStateItem = this.getSceneData();
    return session.callbacksHistory;
  }

  clearHistory(): void {
    const session: GlobalStateItem = this.getSceneData();
    session.callbacksHistory = [];
    session.messageId = undefined;
  }

  private ensureSceneData(): GlobalStateItem {
    if (!this.userState.has(this.userId)) {
      this.userState.set(this.userId, {} as Record<SCENE_ID, GlobalStateItem>);
    }
    const userScenes: Record<SCENE_ID, GlobalStateItem> = this.userState.get(this.userId);
    if (isNil(userScenes[this.sceneId])) {
      userScenes[this.sceneId] = { callbacksHistory: [NAVIGATION_CALLBACK.START], messageId: null };
    }
    return userScenes[this.sceneId];
  }
}
