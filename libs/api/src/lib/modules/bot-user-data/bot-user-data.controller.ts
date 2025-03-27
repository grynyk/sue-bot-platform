import { Controller, Get } from '@nestjs/common';
import { BotUserDataService } from './bot-user-data.service';
import { BotUserStats } from './models';

@Controller('bot-users')
export class BotUserDataController {
  constructor(private readonly service: BotUserDataService) {}

  @Get('stats')
  getMetrics(): Promise<BotUserStats> {
    return this.service.getStats();
  }
}
