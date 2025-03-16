import { Module } from '@nestjs/common';
import { BotUserDataModule } from '@modules/bot-user-data';
import { NotificationDataModule } from '@modules/notification-data';
import { PinoLogger } from 'nestjs-pino';
import { TelegrafModule } from 'nestjs-telegraf';
import { NotificationWorkerService } from './services/notifications-worker.service';

@Module({
  imports: [
    TelegrafModule.forRoot({ token: process.env.BOT_TOKEN }),
    BotUserDataModule,
    NotificationDataModule
  ],
  providers: [ 
    NotificationWorkerService,
    PinoLogger,
  ],
})
export class NotificationsWorkerModule {}