import { BotUser, BotUserDataService } from '@modules/bot-user-data';
import { BotNotification } from '@modules/notification-data/entities/bot-notification.entity';
import { RECURRENCE_PATTERN, SCHEDULE_TYPE } from '@modules/notification-data/models/notifications-data.model';
import { BotNotificationService } from '@modules/notification-data/services/bot-notification.service';
import { PendingUserNotificationService } from '@modules/notification-data/services/pending-user-notification.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { isNil, map } from 'lodash';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class NotificationsPrecomputeService {
  constructor(
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    private readonly botUserDataService: BotUserDataService,
    private readonly botNotificationService: BotNotificationService,
    private readonly pendingUserNotificationService: PendingUserNotificationService
  ) {}

  /**
   * Computes full list of notifications to send to all users.
   * every day at 4 AM
   */
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async precomputeAllPendingNotifications(): Promise<void> {
    try {
      await this.pendingUserNotificationService.drop();
      const users: BotUser[] = await this.botUserDataService.findWithEnabledNotifications();
      const notifications: BotNotification[] = await this.botNotificationService.findAllActive();
      for (const user of users) {
        this.populatePendingNotifications(user, notifications);
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
        this.populatePendingNotifications(user, notifications);
        return;
      }
    } catch (error) {
      this.logger.error(`Precompute Users Pending Notifications: ${error.message}`);
    }
  }

  private async populatePendingNotifications(user: BotUser, notifications: BotNotification[]): Promise<void> {
    try {
      const currentDay: number = new Date().getDay();
      const isWeekday: boolean = currentDay >= 1 && currentDay <= 5;
      const isWeekend: boolean = currentDay === 0 || currentDay === 6;
      for (const notification of notifications) {
        if (this.shouldSendNotificationToday(notification, currentDay, isWeekday, isWeekend)) {
          const send_time: Date = this.calculateSendTime(user, notification);
          if (!isNil(send_time)) {
            await this.pendingUserNotificationService.create({ user_id: user.id, notification_id: notification.id, send_time, sent: false });
          }
        }
      }
    } catch (error) {
      this.logger.error(`Populate Pending Notifications: ${error.message}`);
    }
  }

  private shouldSendNotificationToday(notification: BotNotification, currentDay: number, isWeekday: boolean, isWeekend: boolean): boolean {
    const recurrencePatterns = notification.recurrence_pattern;
    if (recurrencePatterns.includes(RECURRENCE_PATTERN.DAILY)) {
      return true;
    }
    if (recurrencePatterns.includes(RECURRENCE_PATTERN.WEEKDAYS) && isWeekday) {
      return true;
    }
    if (recurrencePatterns.includes(RECURRENCE_PATTERN.WEEKENDS) && isWeekend) {
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
    return recurrencePatterns.includes(daysOfWeek[currentDay]);
  }

  private calculateSendTime(user: BotUser, notification: BotNotification): Date | null {
    const currentDate: Date = new Date();
    if (notification.schedule_type === SCHEDULE_TYPE.EXACT_TIME && notification.time) {
      const [hours, minutes] = map(notification.time.split(':'), Number);
      currentDate.setHours(hours, minutes, 0);
      return currentDate;
    }
    if (notification.schedule_type === SCHEDULE_TYPE.WAKE_UP_OFFSET && user.wake_up_time) {
      const [wakeHours, wakeMinutes] = map(user.wake_up_time.split(':'), Number);
      currentDate.setHours(wakeHours, wakeMinutes, 0);
      currentDate.setMinutes(currentDate.getMinutes() + notification.offset);
      return currentDate;
    }
    if (notification.schedule_type === SCHEDULE_TYPE.BED_TIME_OFFSET && user.bed_time) {
      const [bedHours, bedMinutes] = map(user.bed_time.split(':'), Number);
      currentDate.setHours(bedHours, bedMinutes, 0);
      currentDate.setMinutes(currentDate.getMinutes() - notification.offset);
      return currentDate;
    }
    return null;
  }
}
