import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotUser } from './entities/bot-user.entity';
import { NotificationDataModule } from '../notification-data/notification-data.module';
import { BotUserDataController } from './bot-user-data.controller';
import { BotUserActivityLog } from './entities/bot-user-activity-log.entity';
import { BotUserDataService, BotUserActivityService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([BotUser, BotUserActivityLog]), NotificationDataModule],
  controllers: [BotUserDataController],
  providers: [BotUserDataService, BotUserActivityService],
  exports: [BotUserDataService, BotUserActivityService],
})
export class BotUserDataModule {}
