import { BotUserDataService } from '@modules/bot-user-data';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class UserFlagResetService {
  constructor(private readonly botUserDataService: BotUserDataService, @InjectPinoLogger() protected readonly logger: PinoLogger) {}

  /**
   * Updates all users to reset their flags.
   * was active today = false
   * done tasks counter = 0
   * every day at midnight
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  resetUserActivityFlags(): void {
    try {
      this.botUserDataService.resetFlags();
    } catch (error) {
      this.logger.error(`reset flags: ${error.message}`);
    }
  }
}
