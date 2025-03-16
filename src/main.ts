import { NestFactory } from '@nestjs/core';
import { BotModule } from './bot.module';
import { Logger } from 'nestjs-pino';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GLOBAL_VARIABLES } from '@models/global.model';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(BotModule);
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>(GLOBAL_VARIABLES.PORT) || 3000;
  await app.listen(port);
}

bootstrap().catch((): void => {
  process.exit(1);
});
