import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { from, catchError, EMPTY, Observable, mergeMap, retry, delay } from 'rxjs';
import { BotUser, BotUserDataService } from '@modules/bot-user-data';
import { BotNotificationService, PendingUserNotificationService, SCHEDULE_TYPE } from '@modules/notification-data';
import { addMinutes, startOfToday, subMinutes } from 'date-fns';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { BotNotification } from '@modules/notification-data/entities/bot-notification.entity';
import { isNil, sample } from 'lodash';
import { PARSE_MODE } from '@models/tg.model';
import { InlineKeyboardButton } from 'typegram';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { PendingUserNotification } from '@modules/notification-data/entities/pending-user-notification.entity';

const BATCH_SIZE = 100;
const CONCURRENCY_LIMIT = 15;
const MAX_RETRIES = 2;
const RETRY_DELAY = 500;

@Injectable()
export class NotificationWorkerService {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private readonly botUserDataService: BotUserDataService,
    private readonly botNotificationService: BotNotificationService,
    private readonly pendingUserNotificationService: PendingUserNotificationService
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async processNotifications(): Promise<void> {
    const { fourMinutesAgo, fourMinutesAhead }: Record<string, Date> = this.getTimeRangeForNotifications();
    const pendingNotifications: PendingUserNotification[] = await this.pendingUserNotificationService.findAllNotProcessedInTimeRange(
      fourMinutesAgo,
      fourMinutesAhead
    );
    if (!pendingNotifications.length) {
      return;
    }
    for (let i = 0; i < pendingNotifications.length; i += BATCH_SIZE) {
      const batch: PendingUserNotification[] = pendingNotifications.slice(i, i + BATCH_SIZE);
      await this.processBatch(batch);
    }
  }

  private async processBatch(batch: PendingUserNotification[]): Promise<void> {
    from(batch)
      .pipe(
        mergeMap(
          (notification: PendingUserNotification): Observable<void> =>
            from(this.sendNotification(notification)).pipe(
              retry({
                delay: (retryCount: number, error): Observable<never> => {
                  if (retryCount >= MAX_RETRIES) {
                    this.logger.error(`Notification ${notification.id} failed after ${MAX_RETRIES} retries`);
                    throw error;
                  }
                  return EMPTY.pipe(delay(RETRY_DELAY));
                },
              }),
              catchError((error) => {
                this.logger.error(`Failed to process notification ${notification.id}: ${error.message}`, error.stack);
                return EMPTY;
              })
            ),
          CONCURRENCY_LIMIT
        )
      )
      .subscribe({
        error: (error): void => this.logger.error(`Error in processBatch: ${error.message}`, error.stack),
      });
  }

  private async sendNotification(notification: PendingUserNotification) {
    try {
      const user: BotUser = await this.botUserDataService.findById(notification.user_id);
      if (!user) {
        throw new NotFoundException(`User with id ${notification.user_id} not found`);
      }
      const notificationData: BotNotification = await this.botNotificationService.findOne(notification.notification_id);
      if (!notificationData) {
        throw new NotFoundException(`Notification with id ${notification.notification_id} not found`);
      }
      await this.sendTelegramMessage(user, notificationData);
      await this.pendingUserNotificationService.markAsProcessed(notification.id);
    } catch (error) {
      this.logger.error(
        `Failed to send notification ${notification.id} to user ${notification.user_id}: ${error.message}`,
        error.stack
      );
    }
  }

  private async sendTelegramMessage(user: BotUser, notification: BotNotification): Promise<void> {
    let caption: string;
    try {
      caption = sample(notification.captions);
    } catch (error) {
      this.logger.error(`Failed to sample caption for notification ${notification.id}: ${error.message}`, error.stack);
      return;
    }
    const parse_mode: PARSE_MODE = PARSE_MODE.HTML;
    const inline_keyboard = (notification.buttons || []).map((button: InlineKeyboardButton): [InlineKeyboardButton] => [button]);
    try {
      if (!isNil(notification.image)) {
        await this.bot.telegram.sendPhoto(user.chat_id, notification.image, {
          caption,
          parse_mode,
          ...(notification.buttons && { reply_markup: { inline_keyboard } }),
        });
      } else {
        await this.bot.telegram.sendMessage(user.chat_id, caption, {
          parse_mode,
          ...(notification.buttons && { reply_markup: { inline_keyboard } }),
        });
      }
      if (this.isLastNotification(notification)) {
        const totalTasksNumber: number = await this.botNotificationService.countWithConfirmButton();
        const doneTasksNumber = Number(user.done_tasks_counter) >= totalTasksNumber ? totalTasksNumber : Number(user.done_tasks_counter);
        const doneTasksCaption = `Ви виконали ${doneTasksNumber} з ${totalTasksNumber} завдань сьогодні ${this.getDoneTasksNumberEmoji(
          doneTasksNumber
        )}`;
        await this.bot.telegram.sendMessage(user.chat_id, doneTasksCaption);
      }
    } catch (error) {
      this.logger.error(
        `Failed to send telegram message to user ${user.chat_id} for notification ${notification.id}: ${error.message}`,
        error.stack
      );
      const isBlocked: boolean = error.code === 403 && error.description.includes('blocked');
      const isNotExisting: boolean = error.code === 400 && error.description.includes('chat not found');
      if (isBlocked || isNotExisting) {
        await this.botUserDataService.update(user.chat_id, { blocked: true });
        await this.pendingUserNotificationService.removeAllByUserId(user.id);
      }
      throw error;
    }
  }

  /**
   * Calculates the time range for retrieving pending notifications.
   * @returns An object containing the 'fourMinutesAgo' and 'fourMinutesAhead' dates.
   */
  private getTimeRangeForNotifications(): Record<string, Date> {
    const date: Date = startOfToday();
    const fourMinutesAgo: Date = subMinutes(date, 4);
    const fourMinutesAhead: Date = addMinutes(date, 4);
    return { fourMinutesAgo, fourMinutesAhead };
  }

  private isLastNotification(notification: BotNotification): boolean {
    return notification.schedule_type === SCHEDULE_TYPE.BED_TIME_OFFSET && Number(notification.offset) === 0;
  }

  private getDoneTasksNumberEmoji(doneTasksNumber: number): string {
    switch (doneTasksNumber) {
      case 0:
        return '😭';
      case 1:
      case 2:
        return '😟';
      case 3:
      case 4:
        return '😑';
      case 5:
      case 6:
        return '😊';
      case 7:
        return '🥰';
      default:
        return '🙂';
    }
  }
}
