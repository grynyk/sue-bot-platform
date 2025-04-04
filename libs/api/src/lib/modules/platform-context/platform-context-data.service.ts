import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformContext } from './entities/platform-context.entity';
import { SEASON } from '@sue-bot-platform/types';
import { isNil } from 'lodash';

@Injectable()
export class PlatformContextDataService {
  constructor(
    @InjectRepository(PlatformContext) private readonly repository: Repository<PlatformContext>
  ) {}

  async init(): Promise<PlatformContext> {
    const existingContext: PlatformContext = await this.getContext();
    if (isNil(existingContext)) {
      const context: PlatformContext = this.repository.create({
        id: 1,
        season: SEASON.SUMMER,
        notificationsEnabled: true,
      });
      return this.repository.save(context);
    }
    return existingContext;
  }

  async updateSeason(season: SEASON): Promise<void> {
    await this.repository.update({}, { season });
  }

  async updateNotificationsStatus(notificationsEnabled: boolean): Promise<void> {
    await this.repository.update({}, { notificationsEnabled });
  }

  async getContext(): Promise<PlatformContext> {
    const context: PlatformContext[] = await this.repository.find();
    return context[0];
  }
}
