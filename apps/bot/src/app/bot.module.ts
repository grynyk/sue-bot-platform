import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { RecipesScene } from './scenes/recipes/recipes.scene';
import { TipsScene } from './scenes/tips/tips.scene';
import { SkinTypeTestScene } from './scenes/skin-type-test/skin-type-test.scene';
import { SceneStateService } from './shared';
import { BotUserDataModule } from './modules/bot-user-data/bot-user-data.module';
import { SubscriptionScene } from './scenes/subscription/subscription.scene';
import { SettingsScene } from './scenes/settings/settings.scene';
import { SkinTypeTestDataModule } from '@modules/skin-type-test-data/skin-type-test-data.module';
import { NotificationDataModule } from './modules/notification-data/notification-data.module';
import { PlatformContextDataModule } from '@modules/platform-context';
import { ServerPingCronService, UserActivityResetCronService, NotificationsPreprocessorCronService, NotificationDeliveryCronService } from './crons';
import { CoreModule } from '@core/core.module';
import { ApiModule } from '@sue-bot-platform/api';

const SCENES = [RecipesScene, TipsScene, SkinTypeTestScene, SubscriptionScene, SettingsScene, SceneStateService];
const CRONS = [ServerPingCronService, UserActivityResetCronService, NotificationsPreprocessorCronService, NotificationDeliveryCronService];

@Module({
  imports: [
    CoreModule,
    ApiModule,
    BotUserDataModule,
    SkinTypeTestDataModule,
    NotificationDataModule,
    PlatformContextDataModule,
  ],
  providers: [
    BotUpdate,
    ...CRONS,
    ...SCENES,
  ],
})
export class BotModule {}
