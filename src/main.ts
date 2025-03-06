import { NestFactory } from '@nestjs/core';
import { BotModule } from './bot.module';
import { Logger } from 'nestjs-pino';
import { INestApplicationContext } from '@nestjs/common';

async function bootstrap(): Promise<INestApplicationContext> {
  const app = await NestFactory.create(BotModule, {
    bufferLogs: true,
    autoFlushLogs: false,
  });
  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT || 3000);
  return app;
}

bootstrap();
