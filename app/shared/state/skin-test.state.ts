import { cloneDeep } from 'lodash';
import {
  RecentMessageData,
  SkinTestStateActions,
  SkinTestStateModel,
} from './models';

class SkinTestState implements SkinTestStateActions {
  private _state: SkinTestStateModel = {
    callbacksPath: [],
    resultInfoRecentMessageData: null,
  };

  public setCallbacksPath(callbacks: string[]): void {
    this._state.callbacksPath = cloneDeep(callbacks);
  }

  public addCallbackToPath(callback: string): void {
    this.setCallbacksPath(cloneDeep([...this._state.callbacksPath, callback]));
  }

  public removeCallbackFromPath(callback: string): void {
    this.setCallbacksPath(
      this._state.callbacksPath.filter(
        (storedCallback: string): boolean => callback !== storedCallback
      )
    );
  }

  public removeCallbackFromPathByIndex(index: number): void {
    this.setCallbacksPath(this._state.callbacksPath.splice(index, 1));
  }

  public clearCallbacksPath(): void {
    this.setCallbacksPath([]);
  }

  public getCallbacksPath(): string[] {
    return cloneDeep(this._state.callbacksPath);
  }

  public getCallbackByIndex(index: number): string {
    return this.getCallbacksPath()[index];
  }

  public getCallbacksLastValue(): string {
    return this.getCallbacksPath()[this.getCallbacksPath().length - 1];
  }

  public setRecentResultMessage(message: RecentMessageData): void {
    this._state.resultInfoRecentMessageData = cloneDeep(message);
  }

  public clearRecentResultMessage(): void {
    this.setRecentResultMessage(null);
  }

  public getRecentResultMessage(): RecentMessageData {
    return cloneDeep(this._state.resultInfoRecentMessageData);
  }

  public getAllProps(): SkinTestStateModel {
    return cloneDeep({
      callbacksPath: this._state.callbacksPath,
      resultInfoRecentMessageData: this._state.resultInfoRecentMessageData,
    });
  }
}

const skinTestState = new SkinTestState();
export { skinTestState };
