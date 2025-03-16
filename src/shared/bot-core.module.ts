import { Global, Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { session } from 'telegraf';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { isDev, isStaging } from '@utils/env.util';
import { SkinTypeTestResult } from '@modules/skin-type-test-data/entities/result.entity';
import { SkinTypeTestProduct } from '@modules/skin-type-test-data/entities/product.entity';
import { BotNotification } from '@modules/notification-data/entities/bot-notification.entity';
import { QueuedNotification } from '@modules/notification-data/entities/queued-notification';
import { LoggerOptions } from '../config/logger.options';
import { GLOBAL_VARIABLES } from '@models/global.model';
import { BotUser } from '@modules/bot-user-data';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(LoggerOptions),
    ScheduleModule.forRoot(),
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
        entities: [BotUser, SkinTypeTestResult, SkinTypeTestProduct, BotNotification, QueuedNotification],
        synchronize: true,
        logging: isDev() || isStaging(),
      }),
    }),
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const token: string = configService.getOrThrow<string>(GLOBAL_VARIABLES.BOT_TOKEN);
        const domain: string = configService.get<string>(GLOBAL_VARIABLES.HEROKU_URL);
        const hookPath = `/bot${token}`;
        return {
          token,
          middlewares: [session()],
          webhook: {
            domain,
            hookPath,
            port: process.env.PORT || 3000,
          },
        };
      },
    }),
  ],
  exports: [ConfigModule, LoggerModule, ScheduleModule, TypeOrmModule, TelegrafModule],
})
export class BotCoreModule {}
