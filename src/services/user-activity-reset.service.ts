import { BotUserDataService } from '@modules/bot-user-data';
import { GlobalState } from '@modules/global-state-data/entities/global-state.entity';
import { GlobalStateDataService } from '@modules/global-state-data/global-state-data.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { from, Observable } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { MessageToDelete } from '@modules/global-state-data/models/global-state.model';

@Injectable()
export class UserActivityResetService {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    private readonly botUserDataService: BotUserDataService,
    private readonly globalStateDataService: GlobalStateDataService
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
  async deleteAllSentNotifications(): Promise<void> {
    try {
      const state: GlobalState = await this.globalStateDataService.getCurrentState();
      from(state.messages_to_delete)
        .pipe(
          concatMap(
            (message: MessageToDelete): Observable<boolean> =>
              from(this.bot.telegram.deleteMessage(message.chat_id, message.message_id)).pipe(delay(150))
          )
        )
        .subscribe({
          error: (error) => this.logger.error(`Failed to delete message: ${error.message}`),
        });
    } catch (error) {
      this.logger.error(`reset flags: ${error.message}`);
    }
  }

  /**
   * Updates global state to remove messages id to delete
   * every day at 3 AM
   */
  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async resetMessagesToDelete(): Promise<void> {
    try {
      await this.globalStateDataService.clearMessagesToDelete();
    } catch (error) {
      this.logger.error(`reset flags: ${error.message}`);
    }
  }
}
