import { BotUser, BotUserDataService } from '@modules/bot-user-data';
import { BotNotification } from '@modules/notification-data/entities/bot-notification.entity';
import { SCHEDULE_TYPE } from '@modules/notification-data/models/notifications-data.model';
import { BotNotificationService } from '@modules/notification-data/services/bot-notification.service';
import { PendingUserNotificationService } from '@modules/notification-data/services/pending-user-notification.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { isNil, map } from 'lodash';

@Injectable()
export class NotificationsPrecomputeService {
  constructor(
    private readonly botUserDataService: BotUserDataService,
    private readonly botNotificationService: BotNotificationService,
    private readonly pendingUserNotificationService: PendingUserNotificationService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async precomputePendingNotifications(): Promise<void> {
    await this.pendingUserNotificationService.drop();
    const users: BotUser[] = await this.botUserDataService.findWithEnabledNotifications();
    const notifications: BotNotification[] = await this.botNotificationService.findActive();
    for (const user of users) {
      for (const notification of notifications) {
        const send_time: Date = this.calculateSendTime(user, notification);
        if (!isNil(send_time)) {
          await this.pendingUserNotificationService.create({ user_id: user.id, notification_id: notification.id, send_time, sent: false });
        }
      }
    }
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
