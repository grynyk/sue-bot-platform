import { NestFactory } from '@nestjs/core';
import { BotModule } from './bot.module';
import { Logger } from 'nestjs-pino';
import { INestApplicationContext } from '@nestjs/common';

async function bootstrap(): Promise<INestApplicationContext> {
  const app: INestApplicationContext = await NestFactory.createApplicationContext(BotModule, {
    bufferLogs: true,
    autoFlushLogs: false,
  });
  app.useLogger(app.get(Logger));
  return app;
}

bootstrap();
