export interface RecentMessageData {
  message_id: string;
  recentMessageText: string;
  chatId: string;
}

export interface SkinTestStateModel {
  callbacksPath: Array<string>;
  resultInfoRecentMessageData: RecentMessageData | null;
}

export interface SkinTestStateActions {
  getCallbacksPath(): string[];
  getCallbackByIndex(index: number): string;
  getCallbacksLastValue(): void;
  setCallbacksPath(callbacks: string[]): void;
  addCallbackToPath(callback: string): void;
  removeCallbackFromPath(callback: string): void;
  clearCallbacksPath(): void;
  getRecentResultMessage(): RecentMessageData;
  clearRecentResultMessage(): void;
  setRecentResultMessage(message: RecentMessageData): void;
}
