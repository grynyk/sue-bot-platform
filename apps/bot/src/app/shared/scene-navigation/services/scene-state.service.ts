import { Injectable } from '@nestjs/common';
import { dropRight, isNil, last, uniq } from 'lodash-es';
import { SceneStateItem } from '../models/scene-state.model';
import { SCENE_ID, SceneContext, NAVIGATION_CALLBACK } from '../../../models';

@Injectable()
export class SceneStateService {
  private readonly userState: Map<number, Record<SCENE_ID, SceneStateItem>> = new Map<number, Record<SCENE_ID, SceneStateItem>>();
  private sceneId: SCENE_ID;
  private chatId: number;

  setContext(ctx: SceneContext, sceneId: SCENE_ID): void {
    this.sceneId = sceneId;
    this.chatId = ctx.from.id;
  }

  getSceneData(): SceneStateItem {
    return this.ensureSceneData();
  }

  setSceneData(data: Partial<SceneStateItem>): void {
    const session = this.ensureSceneData();
    Object.assign(session, data);
  }

  resetScene(): void {
    if (!this.userState.has(this.chatId)) {
      return;
    }
    const userScenes: Record<SCENE_ID, SceneStateItem> = this.userState.get(this.chatId);
    if (userScenes[this.sceneId]) {
      userScenes[this.sceneId] = { callbacksHistory: [NAVIGATION_CALLBACK.START], messageId: null };
    }
  }

  getAllScenes(): Record<SCENE_ID, SceneStateItem> | undefined {
    return this.userState.get(this.chatId);
  }

  setMessageId(messageId: number): void {
    const session: SceneStateItem = this.getSceneData();
    session.messageId = messageId;
  }

  getMessageId(): number | undefined {
    const session: SceneStateItem = this.getSceneData();
    return session.messageId;
  }

  storeCallback(step: string): void {
    const session: SceneStateItem = this.getSceneData();
    session.callbacksHistory = uniq([...session.callbacksHistory, step]);
  }

  removeLastCallback(): void {
    const session: SceneStateItem = this.getSceneData();
    session.callbacksHistory = dropRight(session.callbacksHistory);
  }

  getPreviousCallback(): string | null {
    const session: SceneStateItem = this.getSceneData();
    session.callbacksHistory = dropRight(session.callbacksHistory);
    return last(session.callbacksHistory) ?? null;
  }

  getHistory(): string[] {
    const session: SceneStateItem = this.getSceneData();
    return session.callbacksHistory;
  }

  clearHistory(): void {
    const session: SceneStateItem = this.getSceneData();
    session.callbacksHistory = [NAVIGATION_CALLBACK.START];
    session.messageId = undefined;
  }

  private ensureSceneData(): SceneStateItem {
    if (!this.userState.has(this.chatId)) {
      this.userState.set(this.chatId, {} as Record<SCENE_ID, SceneStateItem>);
    }
    const userScenes: Record<SCENE_ID, SceneStateItem> = this.userState.get(this.chatId);
    if (isNil(userScenes[this.sceneId])) {
      userScenes[this.sceneId] = { callbacksHistory: [NAVIGATION_CALLBACK.START], messageId: null };
    }
    return userScenes[this.sceneId];
  }
}
