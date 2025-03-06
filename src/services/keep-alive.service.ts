import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios, { AxiosResponse } from 'axios';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class KeepAliveService {
  private readonly url: string | undefined = process.env.HEROKU_URL;

  constructor(@InjectPinoLogger() protected readonly logger: PinoLogger) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  handleCron(): void {
    this.logger.info(`Pinging ${this.url} to keep the dyno awake.`);
    axios
      .get(this.url)
      .then((response: AxiosResponse): void => {
        this.logger.info(`Ping successful. Status: ${response.status}`);
      })
      .catch((error): void => {
        this.logger.error(`Ping failed: ${error.message}`);
      });
  }
}
