import { BotUser, BotUserDataService } from '@modules/bot-user-data';
import { BotNotification } from '@modules/notification-data/entities/bot-notification.entity';
import { PendingUserNotification } from '@modules/notification-data/entities/pending-user-notification.entity';
import { RECURRENCE_PATTERN, SCHEDULE_TYPE } from '@modules/notification-data/models/notifications-data.model';
import { BotNotificationService } from '@modules/notification-data/services/bot-notification.service';
import { PendingUserNotificationService } from '@modules/notification-data/services/pending-user-notification.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { addMinutes, endOfToday, getDay, isWeekend, setHours, setMinutes, startOfToday, subMinutes } from 'date-fns';
import { isNil, map } from 'lodash';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class NotificationsPrecomputeService {
  private computedNotifications: Partial<PendingUserNotification>[];

  constructor(
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    private readonly botUserDataService: BotUserDataService,
    private readonly botNotificationService: BotNotificationService,
    private readonly pendingUserNotificationService: PendingUserNotificationService
  ) {
    this.computedNotifications = [];
  }

  /**
   * Computes full list of notifications to send to all users.
   * every day at 4 AM
   */
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async precomputeAllPendingNotifications(): Promise<void> {
    try {
      await this.pendingUserNotificationService.drop();
      this.computedNotifications = [];
      const users: BotUser[] = await this.botUserDataService.findWithEnabledNotifications();
      const notifications: BotNotification[] = await this.botNotificationService.findAllActive();
      for (const user of users) {
        this.processPendingNotifications(user, notifications);
      }
      for (let i = 0; i < this.computedNotifications.length; i += 1000) {
        const batch: Partial<PendingUserNotification>[] = this.computedNotifications.slice(i, i + 1000);
        await this.pendingUserNotificationService.bulkInsert(batch);
      }
    } catch (error) {
      this.logger.error(`Precompute All Pending Notifications: ${error.message}`);
    }
  }

  async precomputeUserPendingNotifications(chat_id: number): Promise<void> {
    try {
      const user: BotUser = await this.botUserDataService.findByChatId(chat_id);
      if (isNil(user)) {
        throw new NotFoundException(`User with chat_id: ${chat_id} not found`);
      }
      await this.pendingUserNotificationService.removeAllByUserId(user.id);
      if (user.notifications_enabled && !user.blocked) {
        const notifications: BotNotification[] = await this.botNotificationService.findAllActive();
        this.processPendingNotifications(user, notifications);
      }
    } catch (error) {
      this.logger.error(`Precompute Users Pending Notifications: ${error.message}`);
    }
  }

  private processPendingNotifications(user: BotUser, notifications: BotNotification[]): void {
    for (const notification of notifications) {
      if (this.shouldSendNotificationToday(notification)) {
        const send_time: Date = this.calculateSendTime(user, notification);
        if (!isNil(send_time)) {
          this.computedNotifications.push({
            user_id: user.id,
            notification_id: notification.id,
            send_time,
            processed: false,
          });
        }
      }
    }
  }

  private shouldSendNotificationToday(notification: BotNotification): boolean {
    const date: Date = endOfToday();
    const day: number = getDay(date);
    const recurrencePatterns = notification.recurrence_pattern;
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
    if (notification.schedule_type === SCHEDULE_TYPE.EXACT_TIME && notification.time) {
      const [hours, minutes]: number[] = map(notification.time.split(':'), Number);
      let date: Date = startOfToday();
      date = setHours(date, hours);
      date = setMinutes(date, minutes);
      return date;
    }
    if (notification.schedule_type === SCHEDULE_TYPE.WAKE_UP_OFFSET && user.wake_up_time) {
      const [hours, minutes]: number[] = map(user.wake_up_time.split(':'), Number);
      let date: Date = startOfToday();
      date = setHours(date, hours);
      date = setMinutes(date, minutes);
      date = addMinutes(date, notification.offset);
      return date;
    }
    if (notification.schedule_type === SCHEDULE_TYPE.BED_TIME_OFFSET && user.bed_time) {
      const [hours, minutes]: number[] = map(user.bed_time.split(':'), Number);
      let date: Date = startOfToday();
      date = setHours(date, hours);
      date = setMinutes(date, minutes);
      date = subMinutes(date, notification.offset);
      return date;
    }
    return null;
  }
}
