import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { NotificationsWorkerModule } from './notifications-worker.module';
import { NotificationWorkerService } from './services/notifications-worker.service';
import { INestApplicationContext } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplicationContext = await NestFactory.createApplicationContext(NotificationsWorkerModule);
  const logger: Logger = app.get(Logger);
  app.useLogger(logger);
  const workerService: NotificationWorkerService = app.get(NotificationWorkerService);
  await workerService.processNotifications();
}

bootstrap().catch((): void => {
  process.exit(1);
});