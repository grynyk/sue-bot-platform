import { Module } from '@nestjs/common';
import { BotUserService } from './bot-user.service';
import { BotUserController } from './bot-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotUser } from './entities/bot-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BotUser])],
  controllers: [BotUserController],
  providers: [BotUserService],
})
export class BotUserModule {}
