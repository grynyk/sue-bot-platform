import { Controller, Get } from '@nestjs/common';
import { BotUserDataService } from './bot-user-data.service';
import { BotUser } from './entities/bot-user.entity';

@Controller('bot-user')
export class BotUserDataController {
  constructor(private readonly service: BotUserDataService) {}

  @Get()
  findAll(): Promise<BotUser[]> {
    return this.service.findAll();
  }
}
