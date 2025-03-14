import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotNotification } from './entities/bot-notification.entity';
import { PendingUserNotification } from './entities/pending-user-notification.entity';
import { PendingUserNotificationService } from './services/pending-user-notification.service';
import { BotNotificationService } from './services/bot-notification.service';
import { NotificationDataController } from './notification-data.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BotNotification, PendingUserNotification])],
  controllers: [NotificationDataController],
  providers: [BotNotificationService, PendingUserNotificationService],
  exports: [BotNotificationService, PendingUserNotificationService],
})
export class NotificationDataModule {}
