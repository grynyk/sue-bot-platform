import { NestFactory } from '@nestjs/core';
import { BotModule } from './bot.module';
import { Logger } from 'nestjs-pino';
import { INestApplication, INestApplicationContext } from '@nestjs/common';
import axios from 'axios';

async function setWebhook(): Promise<void> {
  const botToken: string | undefined = process.env.BOT_TOKEN;
  const herokuUrl: string | undefined = process.env.HEROKU_URL;
  if (!botToken || !herokuUrl) {
    console.error('BOT_TOKEN and HEROKU_URL must be defined');
    return;
  }
  const url = `https://api.telegram.org/bot${botToken}/setWebhook?url=${herokuUrl}/bot`;
  try {
    const response = await axios.get(url);
    console.log('Webhook set successfully:', response.data);
  } catch (error) {
    console.error('Error setting webhook:', error);
  }
}

async function bootstrap(): Promise<INestApplicationContext> {
  setWebhook();
  const app: INestApplication = await NestFactory.create(BotModule);
  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT || 3000);
  return app;
}

bootstrap();