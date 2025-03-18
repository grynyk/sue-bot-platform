/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GLOBAL_VARIABLES } from '@models/global.model';
import axios from 'axios';
import { BotModule } from './app/bot.module';

async function sendCrashNotification(error): Promise<void> {
  const token = process.env.BOT_TOKEN;
  const chat_id = process.env.ADMIN_CHAT_ID;
  if (!token || !chat_id) {
    return;
  }
  const text = `🚨 *App Crashed!*\n\n${error.message}\n\n\n${error.stack}`;
  try {
    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id,
      text
    });
  } catch {
    console.error('Failed to send crash notification');
  }
}

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(BotModule);
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>(GLOBAL_VARIABLES.PORT) || 3000;
  await app.listen(port);
}

process.on('uncaughtException', async (error): Promise<void>  => {
  await sendCrashNotification(error);
  process.exit(1);
});

process.on('unhandledRejection', async (error): Promise<void>  => {
  await sendCrashNotification(error);
  process.exit(1);
});

bootstrap().catch(async (error): Promise<void> => {
  await sendCrashNotification(error);
  process.exit(1);
});
