import { Module } from '@nestjs/common';
import { BotUserDataService } from './bot-user-data.service';
import { BotUserDataController } from './bot-user-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotUser } from './entities/bot-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BotUser])],
  controllers: [BotUserDataController],
  providers: [BotUserDataService],
  exports: [BotUserDataService],
})
export class BotUserDataModule {}
