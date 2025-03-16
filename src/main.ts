/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GLOBAL_VARIABLES } from '@models/global.model';
import axios from 'axios';

async function sendCrashNotification(error): Promise<void> {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.ADMIN_CHAT_ID;
  if (!BOT_TOKEN || !CHAT_ID) {
    return;
  }
  const message = `🚨 *App Crashed!*\n\n${error.message}\n\n\n${error.stack}`;
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });
  } catch {
    console.error('Failed to send crash notification');
  }
}

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
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
