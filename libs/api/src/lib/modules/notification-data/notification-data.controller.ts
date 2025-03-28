import { Controller, Get } from '@nestjs/common';
import {
  NotificationDataService,
  QueuedNotificationDataService,
} from './services';
import { BotNotification } from './entities/bot-notification.entity';
import { QueuedNotificationsMetrics } from './models';

@Controller('notifications')
export class NotificationDataController {
  constructor(
    private readonly notificationDataService: NotificationDataService,
    private readonly queuedNotificationDataService: QueuedNotificationDataService
  ) {}

  @Get()
  findAll(): Promise<BotNotification[]> {
    return this.notificationDataService.findAll();
  }

  @Get('metrics')
  metrics(): Promise<QueuedNotificationsMetrics> {
    return this.queuedNotificationDataService.getMetrics();
  }
}
