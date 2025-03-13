import { Injectable } from '@nestjs/common';
import { GlobalState } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SEASON } from './models/global-state.model';
import { isNil } from 'lodash';

@Injectable()
export class GlobalStateDataService {
  constructor(
    @InjectRepository(GlobalState) private readonly repository: Repository<GlobalState>,
  ) {}

  async create(): Promise<GlobalState> {
    const state: GlobalState = await this.repository.create();
    return this.repository.save(state);
  }

  async getCurrentState(): Promise<GlobalState> {
    const state: GlobalState[] = await this.repository.find();
    return state[0];
  }

  async addMessageToDelete(id: number): Promise<GlobalState> {
    const currentState: GlobalState = await this.getCurrentState();
    if (isNil(currentState)) {
      await this.create();
    }
    currentState.messages_to_delete = [...currentState.messages_to_delete, id];
    return this.repository.save(currentState);
  }

  async clearMessagesToDelete(): Promise<GlobalState> {
    const currentState: GlobalState = await this.getCurrentState();
    if (isNil(currentState)) {
      await this.create();
    }
    currentState.messages_to_delete = [];
    return this.repository.save(currentState);
  }

  async setSeason(season: SEASON): Promise<GlobalState> {
    const currentState: GlobalState = await this.getCurrentState();
    if (isNil(currentState)) {
      await this.create();
    }
    currentState.season = season;
    return this.repository.save(currentState);
  }
}
