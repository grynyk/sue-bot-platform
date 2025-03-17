import { BotUser, BotUserDataService } from '@modules/bot-user-data';
import { BotNotification } from '@modules/notification-data/entities/bot-notification.entity';
import { QueuedNotification } from '@modules/notification-data/entities/queued-notification';
import { RECURRENCE_PATTERN, SCHEDULE_TYPE } from '@modules/notification-data/models/notifications.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { addMinutes, endOfToday, getDay, isWeekend, setHours, setMinutes, startOfToday, subMinutes } from 'date-fns';
import { isNil, map } from 'lodash';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { NotificationDataService, QueuedNotificationDataService } from '@modules/notification-data';

@Injectable()
export class NotificationsQueueService {
  private notificationsQueue: Partial<QueuedNotification>[];
  constructor(
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    private readonly botUserDataService: BotUserDataService,
    private readonly notificationDataService: NotificationDataService,
    private readonly queuedNotificationDataService: QueuedNotificationDataService
  ) {
    this.notificationsQueue = [];
  }

  /**
   * Computes full list of notifications to send to all users.
   * every day at 4 AM
   */
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async precomputeAllPendingNotifications(): Promise<void> {
    try {
      await this.queuedNotificationDataService.drop();
      this.notificationsQueue = [];
      const users: BotUser[] = await this.botUserDataService.findWithEnabledNotifications();
      const notifications: BotNotification[] = await this.notificationDataService.findAllActive();
      for (const user of users) {
        this.processPendingNotifications(user, notifications);
      }
      for (let i = 0; i < this.notificationsQueue.length; i += 1000) {
        const batch: Partial<QueuedNotification>[] = this.notificationsQueue.slice(i, i + 1000);
        await this.queuedNotificationDataService.bulkInsert(batch);
      }
    } catch (error) {
      this.logger.error(`Precompute All Pending Notifications: ${error.message}`);
    }
  }

  async precomputeUserPendingNotifications(chatId: number): Promise<void> {
    try {
      const user: BotUser = await this.botUserDataService.findByChatId(chatId);
      if (isNil(user)) {
        throw new NotFoundException(`User with chatId: ${chatId} not found`);
      }
      await this.queuedNotificationDataService.removeAllByUserId(user.id);
      if (user.notificationsEnabled && !user.blocked) {
        const notifications: BotNotification[] = await this.notificationDataService.findAllActive();
        this.processPendingNotifications(user, notifications);
      }
    } catch (error) {
      this.logger.error(`Precompute Users Pending Notifications: ${error.message}`);
    }
  }

  private processPendingNotifications(user: BotUser, notifications: BotNotification[]): void {
    for (const notification of notifications) {
      if (this.shouldSendNotificationToday(notification)) {
        const sendTime: Date = this.calculateSendTime(user, notification);
        if (!isNil(sendTime)) {
          this.notificationsQueue.push({
            userId: user.id,
            notificationId: notification.id,
            sendTime,
            processed: false,
          });
        }
      }
    }
  }

  private shouldSendNotificationToday(notification: BotNotification): boolean {
    const date: Date = endOfToday();
    const day: number = getDay(date);
    const recurrencePatterns = notification.recurrencePattern;
    if (recurrencePatterns.includes(RECURRENCE_PATTERN.DAILY)) {
      return true;
    }
    if (recurrencePatterns.includes(RECURRENCE_PATTERN.WEEKDAYS) && !isWeekend(date)) {
      return true;
    }
    if (recurrencePatterns.includes(RECURRENCE_PATTERN.WEEKENDS) && isWeekend(date)) {
      return true;
    }
    const daysOfWeek: Record<number, RECURRENCE_PATTERN> = {
      0: RECURRENCE_PATTERN.SUNDAY,
      1: RECURRENCE_PATTERN.MONDAY,
      2: RECURRENCE_PATTERN.TUESDAY,
      3: RECURRENCE_PATTERN.WEDNESDAY,
      4: RECURRENCE_PATTERN.THURSDAY,
      5: RECURRENCE_PATTERN.FRIDAY,
      6: RECURRENCE_PATTERN.SATURDAY,
    };
    return recurrencePatterns.includes(daysOfWeek[day]);
  }

  private calculateSendTime(user: BotUser, notification: BotNotification): Date | null {
    if (notification.scheduleType === SCHEDULE_TYPE.EXACT_TIME && notification.time) {
      const [hours, minutes]: number[] = map(notification.time.split(':'), Number);
      let date: Date = startOfToday();
      date = setHours(date, hours);
      date = setMinutes(date, minutes);
      return date;
    }
    if (notification.scheduleType === SCHEDULE_TYPE.WAKE_UP_OFFSET && user.wakeUpTime) {
      const [hours, minutes]: number[] = map(user.wakeUpTime.split(':'), Number);
      let date: Date = startOfToday();
      date = setHours(date, hours);
      date = setMinutes(date, minutes);
      date = addMinutes(date, notification.offset);
      return date;
    }
    if (notification.scheduleType === SCHEDULE_TYPE.BED_TIME_OFFSET && user.bedTime) {
      const [hours, minutes]: number[] = map(user.bedTime.split(':'), Number);
      let date: Date = startOfToday();
      date = setHours(date, hours);
      date = setMinutes(date, minutes);
      date = subMinutes(date, notification.offset);
      return date;
    }
    return null;
  }
}
