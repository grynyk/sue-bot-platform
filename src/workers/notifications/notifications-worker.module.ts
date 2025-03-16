import { Module } from '@nestjs/common';
import { BotUser, BotUserDataModule } from '@modules/bot-user-data';
import { NotificationDataModule } from '@modules/notification-data';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { TelegrafModule } from 'nestjs-telegraf';
import { NotificationWorkerService } from './services/notifications-worker.service';
import { GLOBAL_VARIABLES } from '@models/global.model';
import { BotNotification } from '@modules/notification-data/entities/bot-notification.entity';
import { PendingUserNotification } from '@modules/notification-data/entities/pending-user-notification.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { isDev, isStaging } from '@utils/env.util';
import { LoggerOptions } from 'src/config/logger.options';

@Module({
  imports: [
    TelegrafModule.forRoot({ token: process.env.BOT_TOKEN }),
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(LoggerOptions),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>(GLOBAL_VARIABLES.DATABASE_URL),
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [BotUser, BotNotification, PendingUserNotification],
        synchronize: true,
        logging: isDev() || isStaging(),
      }),
    }),
    BotUserDataModule,
    NotificationDataModule,
  ],
  providers: [NotificationWorkerService, PinoLogger],
})
export class NotificationsWorkerModule {}
