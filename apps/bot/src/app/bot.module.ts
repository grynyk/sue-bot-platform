import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { RecipesScene } from './scenes/recipes/recipes.scene';
import { TipsScene } from './scenes/tips/tips.scene';
import { SkinTypeTestScene } from './scenes/skin-type-test/skin-type-test.scene';
import { SceneStateService } from './shared';
import { SubscriptionScene } from './scenes/subscription/subscription.scene';
import { SettingsScene } from './scenes/settings/settings.scene';
import {
  ServerPingCronService,
  UserActivityResetCronService,
  NotificationsPreprocessorCronService,
  NotificationDeliveryCronService,
} from './crons';
import { CoreModule, GLOBAL_VARIABLES } from '@sue-bot-platform/core';
import { ApiModule } from '@sue-bot-platform/api';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import { session } from 'telegraf';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const SCENES = [
  RecipesScene,
  TipsScene,
  SkinTypeTestScene,
  SubscriptionScene,
  SettingsScene,
  SceneStateService,
];
const CRONS = [
  ServerPingCronService,
  UserActivityResetCronService,
  NotificationsPreprocessorCronService,
  NotificationDeliveryCronService,
];

@Module({
  imports: [
    CoreModule,
    ApiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../dist/apps/admin-panel/browser'),
      serveRoot: '/admin-panel',
    }),
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const token: string = configService.getOrThrow<string>(
          GLOBAL_VARIABLES.BOT_TOKEN
        );
        const domain: string = configService.get<string>(
          GLOBAL_VARIABLES.HEROKU_URL
        );
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
  providers: [BotUpdate, ...CRONS, ...SCENES],
})
export class BotModule {}
