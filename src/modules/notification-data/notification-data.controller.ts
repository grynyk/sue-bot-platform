import { Controller, Get } from '@nestjs/common';
import { BotNotificationService } from './services';
import { BotNotification } from './entities/bot-notification.entity';

@Controller('notifications')
export class NotificationDataController {
  constructor(private readonly service: BotNotificationService) {}

  @Get()
  findAll(): Promise<BotNotification[]> {
    return this.service.findAll();
  }
}
