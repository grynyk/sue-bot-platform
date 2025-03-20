/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { BotModule } from './app/bot.module';
import { GLOBAL_VARIABLES } from '@sue-bot-platform/core';

async function sendCrashReport(error): Promise<void> {
  const token: string = process.env.BOT_TOKEN;
  const chatId: string = process.env.ADMIN_CHAT_ID;
  const baseUrl: string = process.env.BOT_API_URL
  if (!token || !chatId) {
    return;
  }
  const text = `🚨 *App Crashed!*\n\n${error.message}\n\n\n${error.stack}`;
  try {
    await axios.post(`${baseUrl}${token}/sendMessage`, {
      chat_id: chatId,
      text
    });
  } catch {
    console.error('Failed to send crash notification');
  }
}

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(BotModule);
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>(GLOBAL_VARIABLES.PORT) || 3000;
  await app.listen(port);
}

process.on('uncaughtException', async (error): Promise<void>  => {
  await sendCrashReport(error);
  process.exit(1);
});

process.on('unhandledRejection', async (error): Promise<void>  => {
  await sendCrashReport(error);
  process.exit(1);
});

bootstrap().catch(async (error): Promise<void> => {
  await sendCrashReport(error);
  process.exit(1);
});
