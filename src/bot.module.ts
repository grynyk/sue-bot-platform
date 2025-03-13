import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { session } from 'telegraf';
import { LoggerOptions } from './config/logger.options';
import { GLOBAL_VARIABLES } from './models/global.model';
import { BotUpdate } from './bot.update';
import { RecipesScene } from './scenes/recipes/recipes.scene';
import { TipsScene } from './scenes/tips/tips.scene';
import { SkinTypeTestScene } from './scenes/skin-type-test/skin-type-test.scene';
import { SceneStateService } from './shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotKeepAliveService } from './services/bot-keep-alive.service';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsDeliveryService } from './services/notifications-delivery.service';
import { BotUser } from './modules/bot-user-data/entities/bot-user.entity';
import { BotUserDataModule } from './modules/bot-user-data/bot-user-data.module';
import { SubscriptionScene } from './scenes/subscription/subscription.scene';
import { SettingsScene } from './scenes/settings/settings.scene';
import { isDev, isStaging } from '@utils/env.util';
import { SkinTypeTestResult } from '@modules/skin-type-test-data/entities/result.entity';
import { SkinTypeTestProduct } from '@modules/skin-type-test-data/entities/product.entity';
import { SkinTypeTestDataModule } from '@modules/skin-type-test-data/skin-type-test-data.module';
import { UserActivityResetService } from './services/user-activity-reset.service';
import { NotificationDataModule } from './modules/notification-data/notification-data.module';
import { NotificationsPrecomputeService } from './services/notifications-precompute.service';
import { BotNotification } from '@modules/notification-data/entities/bot-notification.entity';
import { PendingUserNotification } from '@modules/notification-data/entities/pending-user-notification.entity';
import { GlobalStateDataModule } from '@modules/global-state-data/global-state-data.module';
import { GlobalState } from '@modules/global-state-data/entities';

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
        entities: [BotUser, SkinTypeTestResult, SkinTypeTestProduct, BotNotification, PendingUserNotification, GlobalState],
        synchronize: true,
        logging: isDev() || isStaging(),
      }),
    }),
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const token: string = configService.getOrThrow<string>(GLOBAL_VARIABLES.BOT_TOKEN);
        return {
          token,
          middlewares: [session()],
          webhook: {
            domain: process.env.HEROKU_URL,
            path: '/bot',
            port: process.env.PORT || 3000,
          },
        };
      },
    }),
    BotUserDataModule,
    SkinTypeTestDataModule,
    NotificationDataModule,
    GlobalStateDataModule
  ],
  controllers: [],
  providers: [
    BotUpdate,
    BotKeepAliveService,
    UserActivityResetService,
    NotificationsDeliveryService,
    NotificationsPrecomputeService,
    SceneStateService,
    RecipesScene,
    TipsScene,
    SkinTypeTestScene,
    SubscriptionScene,
    SettingsScene,
  ],
})
export class BotModule {}
