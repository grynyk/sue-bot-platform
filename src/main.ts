import { NestFactory } from '@nestjs/core';
import { BotModule } from './bot.module';
import { Logger } from 'nestjs-pino';
import { INestApplication, INestApplicationContext } from '@nestjs/common';

async function bootstrap(): Promise<INestApplicationContext> {
  const app: INestApplication = await NestFactory.create(BotModule);
  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT || 3000);
  return app;
}

bootstrap();
