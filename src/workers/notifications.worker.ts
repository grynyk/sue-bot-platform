import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { BotModule } from '../bot.module';
import { NotificationWorkerService } from '../services/notifications-worker.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(BotModule);
  const logger = app.get(Logger);
  app.useLogger(logger);
  const workerService = app.get(NotificationWorkerService);
  await workerService.processNotifications();
}

bootstrap().catch((): void => {
  process.exit(1);
});