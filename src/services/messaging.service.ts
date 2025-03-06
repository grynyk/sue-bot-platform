import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class MessagingService {
  constructor(
    @InjectPinoLogger() private readonly logger: PinoLogger,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async sendDailyMessages() {
    const users = [];
    for (const user of users) {
      try {
        this.logger.info(`Message sent to user ${user.id}`);
      } catch (error) {
        this.logger.error(`Failed to send message to user ${user.id}: ${error.message}`);
      }
    }
  }
}
