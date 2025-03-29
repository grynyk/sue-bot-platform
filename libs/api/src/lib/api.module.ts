import { Module } from '@nestjs/common';
import { BotUser, BotUserDataModule } from './modules/bot-user-data';
import { NotificationDataModule } from './modules/notification-data';
import { PlatformContext, PlatformContextDataModule } from './modules/platform-context';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotNotification } from './modules/notification-data/entities/bot-notification.entity';
import { QueuedNotification } from './modules/notification-data/entities/queued-notification';
import { CoreModule, GLOBAL_VARIABLES } from '@sue-bot-platform/core';
import { SkinTypeTestDataModule } from './modules/skin-type-test-data';
import { SkinTypeTestProduct, SkinTypeTestResult } from './modules/skin-type-test-data/entities';
import { ServerMetricsModule } from './modules/server-metrics';

@Module({
  imports: [
    CoreModule,
    BotUserDataModule,
    NotificationDataModule,
    PlatformContextDataModule,
    SkinTypeTestDataModule,
    ServerMetricsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>(GLOBAL_VARIABLES.DATABASE_URL),
        host: configService.get<string>(GLOBAL_VARIABLES.DB_HOST),
        port: configService.get<number>(GLOBAL_VARIABLES.DB_PORT, 5432),
        username: configService.get<string>(GLOBAL_VARIABLES.DB_USER),
        password: configService.get<string>(GLOBAL_VARIABLES.DB_PASSWORD),
        database: configService.get<string>(GLOBAL_VARIABLES.DB_NAME),
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [BotUser, BotNotification, QueuedNotification, PlatformContext, SkinTypeTestProduct, SkinTypeTestResult],
        synchronize: true,
        logging: false,
      }),
    }),
  ],
  exports: [TypeOrmModule, BotUserDataModule, NotificationDataModule, PlatformContextDataModule, ServerMetricsModule],
})
export class ApiModule {}
