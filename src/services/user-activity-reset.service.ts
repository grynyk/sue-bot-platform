import { BotUserDataService } from '@modules/bot-user-data';
import { GlobalStateDataService } from '@modules/global-state-data/global-state-data.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class UserActivityResetService {
  constructor(
    private readonly botUserDataService: BotUserDataService,
    private readonly globalStateDataService: GlobalStateDataService,
    @InjectPinoLogger() protected readonly logger: PinoLogger
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

  /**
   * Updates global state to remove messages id to delete
   * every day at 2 AM
   */
  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async resetMessagesToDelete(): Promise<void> {
    try {
      await this.globalStateDataService.clearMessagesToDelete();
    } catch (error) {
      this.logger.error(`reset flags: ${error.message}`);
    }
  }
}
