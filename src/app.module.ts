import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { RecipesScene } from './scenes/recipes/recipes.scene';
import { TipsScene } from './scenes/tips/tips.scene';
import { SkinTypeTestScene } from './scenes/skin-type-test/skin-type-test.scene';
import { BotCoreModule, SceneStateService } from './shared';
import { BotKeepAliveService } from './services/bot-keep-alive.service';
import { BotUserDataModule } from './modules/bot-user-data/bot-user-data.module';
import { SubscriptionScene } from './scenes/subscription/subscription.scene';
import { SettingsScene } from './scenes/settings/settings.scene';
import { SkinTypeTestDataModule } from '@modules/skin-type-test-data/skin-type-test-data.module';
import { UserActivityResetService } from './services/user-activity-reset.service';
import { NotificationDataModule } from './modules/notification-data/notification-data.module';
import { NotificationsQueueService } from './services/notifications-queue.service';
import { NotificationWorkerService } from './services/notifications-worker.service';
import { PlatformContextDataModule } from '@modules/platform-context';

@Module({
  imports: [
    BotCoreModule,
    BotUserDataModule,
    SkinTypeTestDataModule,
    NotificationDataModule,
    PlatformContextDataModule,
  ],
  providers: [
    BotUpdate,
    BotKeepAliveService,
    UserActivityResetService,
    NotificationsQueueService,
    NotificationWorkerService,
    SceneStateService,
    RecipesScene,
    TipsScene,
    SkinTypeTestScene,
    SubscriptionScene,
    SettingsScene,
  ],
})
export class AppModule {}
