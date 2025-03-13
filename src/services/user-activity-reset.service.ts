import { BotUserDataService } from '@modules/bot-user-data';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

@Injectable()
export class UserActivityResetService {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
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
