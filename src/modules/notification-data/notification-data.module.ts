import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotNotification } from './entities/bot-notification.entity';
import { QueuedNotification } from './entities/queued-notification';
import { QueuedNotificationDataService } from './services/queued-notification-data.service';
import { NotificationDataService } from './services/notification-data.service';
import { NotificationDataController } from './notification-data.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BotNotification, QueuedNotification])],
  controllers: [NotificationDataController],
  providers: [NotificationDataService, QueuedNotificationDataService],
  exports: [NotificationDataService, QueuedNotificationDataService],
})
export class NotificationDataModule {}
