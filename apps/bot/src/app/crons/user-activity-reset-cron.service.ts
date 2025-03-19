import { BotUserDataService } from '@sue-bot-platform/api';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class UserActivityResetCronService {
  constructor(
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    private readonly botUserDataService: BotUserDataService,
  ) {}

  /**
   * Updates all users to reset their flags and counters.
   * was active today = false
   * done tasks counter = 0
   * every day at 1 AM
   */
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async resetUserFlagsCounters(): Promise<void> {
    try {
      await this.botUserDataService.resetFlagsCounters();
    } catch (error) {
      this.logger.error(`reset flags: ${error.message}`);
    }
  }
}
