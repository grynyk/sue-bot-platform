import { Module } from '@nestjs/common';
import { BotUserDataService } from '@modules/bot-user-data';
import { BotNotificationService, PendingUserNotificationService } from '@modules/notification-data';
import { PinoLogger } from 'nestjs-pino';
import { TelegrafModule } from 'nestjs-telegraf';
import { NotificationWorkerService } from './services/notifications-worker.service';

@Module({
  imports: [TelegrafModule.forRoot({ token: process.env.BOT_TOKEN })],
  providers: [
    BotUserDataService,
    BotNotificationService,
    PendingUserNotificationService,
    NotificationWorkerService,
    PinoLogger,
  ],
})
export class NotificationsWorkerModule {}