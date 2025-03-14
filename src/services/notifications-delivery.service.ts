import { PARSE_MODE } from '@models/tg.model';
import { BotUser, BotUserDataService } from '@modules/bot-user-data';
import { BotNotification } from '@modules/notification-data/entities/bot-notification.entity';
import { PendingUserNotification } from '@modules/notification-data/entities/pending-user-notification.entity';
import { SCHEDULE_TYPE } from '@modules/notification-data/models/notifications-data.model';
import { BotNotificationService } from '@modules/notification-data/services/bot-notification.service';
import { PendingUserNotificationService } from '@modules/notification-data/services/pending-user-notification.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { addMinutes, subMinutes } from 'date-fns';
import { sample } from 'lodash';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectBot } from 'nestjs-telegraf';
import { catchError, concatMap, delay, EMPTY, from, Observable } from 'rxjs';
import { Telegraf } from 'telegraf';
import { InlineKeyboardButton } from 'typegram';

@Injectable()
export class NotificationsDeliveryService {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private readonly botUserDataService: BotUserDataService,
    private readonly botNotificationService: BotNotificationService,
    private readonly pendingUserNotificationService: PendingUserNotificationService,
  ) {}

  /**
   * Sends scheduled notifications to users.
   * checks for pending notifications every 5 minutes
   */
  @Cron(CronExpression.EVERY_5_MINUTES)
  async sendScheduledNotifications(): Promise<void> {
    const { fourMinutesAgo, fourMinutesAhead }: Record<string, Date> = this.getTimeRangeForNotifications();
    const pendingNotifications: PendingUserNotification[] = await this.pendingUserNotificationService.findAllUnsentInTimeRange(
      fourMinutesAgo,
      fourMinutesAhead
    );
    from(pendingNotifications)
      .pipe(
        concatMap(
          (pendingNotification: PendingUserNotification): Observable<number> =>
            from(this.processNotification(pendingNotification)).pipe(
              delay(150),
              catchError((error) => {
                this.logger.error(`Failed to process notification: ${error.message}`);
                return EMPTY;
              })
            )
        ),
      )
      .subscribe({
        error: (error) => this.logger.error(`${error.message}`),
      });
  }

  /**
   * Calculates the time range for retrieving pending notifications.
   * @returns An object containing the 'fourMinutesAgo' and 'fourMinutesAhead' dates.
   */
  private getTimeRangeForNotifications(): Record<string, Date> {
    const now: Date = new Date();
    const fourMinutesAgo: Date = subMinutes(now, 4);
    const fourMinutesAhead: Date = addMinutes(now, 4);
    return { fourMinutesAgo, fourMinutesAhead };
  }

  private async processNotification(pendingNotification: PendingUserNotification): Promise<number> {
    try {
      const user: BotUser = await this.botUserDataService.findById(pendingNotification.user_id);
      const notification: BotNotification = await this.botNotificationService.findOne(pendingNotification.notification_id);
      await this.sendTelegramNotification(user, notification);
      await this.pendingUserNotificationService.markAsSent(pendingNotification.id);
      if (this.isLastNotification(notification)) {
        const totalTasksNumber: number = await this.botNotificationService.countWithConfirmButton();
        const doneTasksNumber = Number(user.done_tasks_counter);
        const doneTasksCaption = `Ви виконали ${doneTasksNumber} з ${totalTasksNumber} завдань сьогодні ${this.getDoneTasksNumberEmoji(
          doneTasksNumber
        )}`;
        await this.bot.telegram.sendMessage(user.chat_id, doneTasksCaption);
      }
      return user.chat_id;
    } catch (error) {
      this.logger.error(`Failed to process notification ${pendingNotification.id}: ${error.message}`);
      throw error;
    }
  }

  private async sendTelegramNotification(user: BotUser, notification: BotNotification): Promise<void> {
    const caption: string = sample(notification.captions);
    const parse_mode: PARSE_MODE = PARSE_MODE.HTML;
    const inline_keyboard = (notification.buttons || []).map((button: InlineKeyboardButton): [InlineKeyboardButton] => [button]);
    try {
      if (notification.image) {
        await this.bot.telegram.sendPhoto(user.chat_id, notification.image, {
          caption,
          parse_mode,
          ...(notification.buttons && { reply_markup: { inline_keyboard } }),
        });
        return;
      }
      await this.bot.telegram.sendMessage(user.chat_id, caption, {
        parse_mode,
        ...(notification.buttons && { reply_markup: { inline_keyboard } }),
      });
    } catch (error) {
      const isBlocked = error.code === 403 && error.description.includes('blocked');
      const isNotExisting = error.code === 400 && error.description.includes('chat not found');
      if (isBlocked || isNotExisting) {
        await this.botUserDataService.update(user.chat_id, { blocked: true });
      }
      throw error;
    }
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
