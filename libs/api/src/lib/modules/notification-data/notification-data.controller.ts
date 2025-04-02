import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotificationDataService, QueuedNotificationDataService } from './services';
import { BotNotification } from './entities/bot-notification.entity';
import { QueuedNotificationsMetrics } from '@sue-bot-platform/types';
import { MultiAuthGuard } from '../admin-panel-user-data';

@Controller('notifications')
export class NotificationDataController {
  constructor(
    private readonly notificationDataService: NotificationDataService,
    private readonly queuedNotificationDataService: QueuedNotificationDataService
  ) {}

  @UseGuards(MultiAuthGuard)
  @Get()
  findAll(): Promise<BotNotification[]> {
    return this.notificationDataService.findAll();
  }

  @UseGuards(MultiAuthGuard)
  @Get('metrics')
  async metrics(): Promise<QueuedNotificationsMetrics> {
    const queuedNotificationsMetrics: QueuedNotificationsMetrics = await this.queuedNotificationDataService.getMetrics();
    const definedNotificationsNumber: number = await this.notificationDataService.countAll();
    return {
      ...queuedNotificationsMetrics,
      defined: definedNotificationsNumber,
    };
  }
}
