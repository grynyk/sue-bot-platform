/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { BotModule } from './bot.module';
import { Logger } from 'nestjs-pino';
import { INestApplication, INestApplicationContext } from '@nestjs/common';
import axios from 'axios';
import { isProd } from '@utils/env.util';

async function setWebhook(): Promise<void> {
  const botToken: string | undefined = process.env.BOT_TOKEN;
  const herokuUrl: string | undefined = process.env.HEROKU_URL;
  if (!botToken || !herokuUrl) {
    console.error('BOT_TOKEN and HEROKU_URL must be defined');
    return;
  }
  const url = `https://api.telegram.org/bot${botToken}/setWebhook?url=${herokuUrl}/bot${botToken}`;
  try {
    const response = await axios.get(url);
    console.log('Webhook set successfully:', response.data);
  } catch (error) {
    console.error('Error setting webhook:', error);
  }
}

async function bootstrap(): Promise<INestApplicationContext> {
  const app: INestApplication = await NestFactory.create(BotModule);
  app.useLogger(app.get(Logger));
  if (isProd()) {
    await setWebhook();
  }
  await app.listen(process.env.PORT || 3000);
  return app;
}

bootstrap().catch((): void => {
  process.exit(1);
});