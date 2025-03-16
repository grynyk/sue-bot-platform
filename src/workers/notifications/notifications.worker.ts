import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { NotificationsWorkerModule } from './notifications-worker.module';
import { NotificationWorkerService } from './services/notifications-worker.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(NotificationsWorkerModule);
  const logger = app.get(Logger);
  app.useLogger(logger);
  const workerService = app.get(NotificationWorkerService);
  await workerService.processNotifications();
}

bootstrap().catch((): void => {
  process.exit(1);
});