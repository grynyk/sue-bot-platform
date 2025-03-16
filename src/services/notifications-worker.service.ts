import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { from, catchError, EMPTY, Observable, delay, concatMap } from 'rxjs';
import { BotUser, BotUserDataService } from '@modules/bot-user-data';
import { NotificationDataService, QueuedNotificationDataService, SCHEDULE_TYPE } from '@modules/notification-data';
import { addMinutes, subMinutes } from 'date-fns';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { BotNotification } from '@modules/notification-data/entities/bot-notification.entity';
import { isNil, sample } from 'lodash';
import { PARSE_MODE } from '@models/tg.model';
import { InlineKeyboardButton } from 'typegram';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { QueuedNotification } from '@modules/notification-data/entities/queued-notification';

const DELAY_TIME = 250;

@Injectable()
export class NotificationWorkerService {
  private failedUserIds: Set<number>;

  constructor(
    @InjectBot() private readonly bot: Telegraf,
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private readonly botUserDataService: BotUserDataService,
    private readonly notificationDataService: NotificationDataService,
    private readonly queuedNotificationDataService: QueuedNotificationDataService
  ) {
    this.failedUserIds = new Set<number>();
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async processNotifications(): Promise<void> {
    const { fiveMinutesAgo, fiveMinutesAhead }: Record<string, Date> = this.getTimeRangeForNotifications();
    const pendingNotifications: QueuedNotification[] = await this.queuedNotificationDataService.findAllNotProcessedInTimeRange(
      fiveMinutesAgo,
      fiveMinutesAhead
    );
    if (!pendingNotifications.length) {
      this.logger.info('No pending notifications to process.');
      return;
    }
    this.failedUserIds.clear();
    this.logger.info(`Processing ${pendingNotifications.length} pending notifications ${fiveMinutesAgo} - ${fiveMinutesAhead}`);
    from(pendingNotifications)
      .pipe(
        concatMap(
          (notification: QueuedNotification): Observable<void> =>
            from(this.sendNotification(notification)).pipe(
              delay(DELAY_TIME),
              catchError((error): Observable<never> => {
                this.logger.error(`Error in processNotifications: ${error.message}`, error.stack);
                return EMPTY;
              })
            )
        )
      )
      .subscribe({
        complete: async () => {
          if (this.failedUserIds.size > 0) {
            await this.botUserDataService.markUsersAsBlocked([...this.failedUserIds]);
            await this.queuedNotificationDataService.removeAllByUserIds([...this.failedUserIds]);
          }
          this.logger.info(`Processed successfully: ${pendingNotifications.length} notifications`);
        },
      });
  }

  private async sendNotification(notification: QueuedNotification) {
    try {
      const user: BotUser = await this.botUserDataService.findById(notification.user_id);
      if (!user) {
        throw new NotFoundException(`User with id ${notification.user_id} not found`);
      }
      const notificationData: BotNotification = await this.notificationDataService.findOne(notification.notification_id);
      if (!notificationData) {
        throw new NotFoundException(`Notification with id ${notification.notification_id} not found`);
      }
      await this.sendTelegramMessage(user, notificationData);
      await this.queuedNotificationDataService.markAsProcessed(notification.id);
    } catch (error) {
      this.logger.error(`Failed to send notification ${notification.id} to user ${notification.user_id}: ${error.message}`, error.stack);
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
        await this.sendDoneTasksSummary(user);
      }
    } catch (error) {
      const isBlocked: boolean = error.code === 403 && error.description.includes('blocked');
      const isNotExisting: boolean = error.code === 400 && error.description.includes('chat not found');
      if (isBlocked || isNotExisting) {
        this.failedUserIds.add(user.chat_id);
      }
    }
  }

  /**
   * Calculates the time range for retrieving pending notifications.
   * @returns An object containing the 'fourMinutesAgo' and 'fourMinutesAhead' dates.
   */
  private getTimeRangeForNotifications(): Record<string, Date> {
    const date: Date = new Date();
    const fiveMinutesAgo: Date = subMinutes(date, 5);
    const fiveMinutesAhead: Date = addMinutes(date, 5);
    return { fiveMinutesAgo, fiveMinutesAhead };
  }

  private isLastNotification(notification: BotNotification): boolean {
    return notification.schedule_type === SCHEDULE_TYPE.BED_TIME_OFFSET && Number(notification.offset) === 0;
  }

  private getDoneTasksNumberEmoji(doneTasksNumber: number): string {
    const emojis: string[] = ['😭', '😟', '😟', '😑', '😑', '😊', '😊', '🥰'];
    return emojis[Math.min(doneTasksNumber, emojis.length - 1)] || '🙂';
  }

  private async sendDoneTasksSummary(user: BotUser): Promise<void> {
    const totalTasksNumber: number = await this.notificationDataService.countWithConfirmButton();
    const doneTasksNumber = Number(user.done_tasks_counter) >= totalTasksNumber ? totalTasksNumber : Number(user.done_tasks_counter);
    const doneTasksCaption = `Ви виконали ${doneTasksNumber} з ${totalTasksNumber} завдань сьогодні ${this.getDoneTasksNumberEmoji(
      doneTasksNumber
    )}`;
    await this.bot.telegram.sendMessage(user.chat_id, doneTasksCaption);
  }
}
