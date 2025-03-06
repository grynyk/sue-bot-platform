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
import { BotUserModule } from './modules/bot-user/bot-user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeepAliveService } from './services/keep-alive.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MessagingService } from './services/messaging.service';
import { BotUser } from './modules/bot-user/entities/bot-user.entity';

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
        url: configService.get<string>(GLOBAL_VARIABLES.DATABASE_URL, 'localhost'),
        host: configService.get<string>(GLOBAL_VARIABLES.DB_HOST, 'localhost'),
        port: configService.get<number>(GLOBAL_VARIABLES.DB_PORT, 5432),
        username: configService.get<string>(GLOBAL_VARIABLES.DB_USER, 'admin'),
        password: configService.get<string>(GLOBAL_VARIABLES.DB_PASSWORD, 'password'),
        database: configService.get<string>(GLOBAL_VARIABLES.DB_NAME, 'database'),
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [BotUser],
        synchronize: true,
        logging: true,
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
    BotUserModule,
  ],
  providers: [BotUpdate, KeepAliveService, SceneStateService, RecipesScene, TipsScene, SkinTypeTestScene, MessagingService],
})
export class BotModule {}
