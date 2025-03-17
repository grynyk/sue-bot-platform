import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformContext } from './entities/platform-context.entity';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { SEASON } from './models/platform-context.model';
import { isNil } from 'lodash';

@Injectable()
export class PlatformContextDataService {
  constructor(
    @InjectRepository(PlatformContext) private readonly repository: Repository<PlatformContext>,
    @InjectPinoLogger() protected readonly logger: PinoLogger
  ) {}

  async init(): Promise<PlatformContext> {
    const existingContext: PlatformContext = await this.getContext();
    if (isNil(existingContext)) {
      const context: PlatformContext = this.repository.create({
        id: 1,
        season: SEASON.SUMMER,
        notifications_enabled: true,
      });
      return this.repository.save(context);
    }
    return existingContext;
  }

  async updateSeason(season: SEASON): Promise<void> {
    await this.repository.update({}, { season });
  }

  async updateNotificationsStatus(notifications_enabled: boolean): Promise<void> {
    await this.repository.update({}, { notifications_enabled });
  }

  async getContext(): Promise<PlatformContext> {
    const context: PlatformContext[] = await this.repository.find();
    return context[0];
  }
}
