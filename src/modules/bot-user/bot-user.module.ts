import { Module } from '@nestjs/common';
import { BotUserService } from './bot-user.service';
import { BotUserController } from './bot-user.controller';

@Module({
  controllers: [BotUserController],
  providers: [BotUserService],
})
export class BotUserModule {}
