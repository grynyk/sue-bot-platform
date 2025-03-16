import { Controller, Get } from '@nestjs/common';
import { NotificationDataService } from './services';
import { BotNotification } from './entities/bot-notification.entity';

@Controller('notifications')
export class NotificationDataController {
  constructor(private readonly service: NotificationDataService) {}

  @Get()
  findAll(): Promise<BotNotification[]> {
    return this.service.findAll();
  }
}
