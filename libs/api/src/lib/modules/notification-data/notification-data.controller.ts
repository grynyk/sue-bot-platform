import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotificationDataService, QueuedNotificationDataService } from './services';
import { BotNotification } from './entities/bot-notification.entity';
import { QueuedNotificationsMetrics } from '@sue-bot-platform/types';
import { JwtAuthGuard, TelegramBotTokenGuard } from '../admin-panel-user-data';

@Controller('notifications')
export class NotificationDataController {
  constructor(
    private readonly notificationDataService: NotificationDataService,
    private readonly queuedNotificationDataService: QueuedNotificationDataService
  ) {}

  @UseGuards(TelegramBotTokenGuard)
  @Get()
  findAll(): Promise<BotNotification[]> {
    return this.notificationDataService.findAll();
  }

  @UseGuards(JwtAuthGuard)
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
