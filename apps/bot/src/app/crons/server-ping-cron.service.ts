import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import axios, { AxiosResponse } from 'axios';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class ServerPingCronService {
  private readonly url: string | undefined = process.env.HEROKU_URL;

  constructor(@InjectPinoLogger() protected readonly logger: PinoLogger) {}

  /**
   * Pings the Heroku app to keep the dyno awake.
   * every 29 minutes
   */
  @Interval(29 * 60 * 1000)
  keepAwake(): void {
    this.logger.info(`Pinging ${this.url} to keep the dyno awake.`);
    axios
      .get(`${this.url}/notifications`)
      .then((response: AxiosResponse): void => {
        this.logger.info(`Ping successful. Status: ${response.status}`);
      })
      .catch((error): void => {
        this.logger.error(`Ping failed: ${error.message}`);
      });
  }
}
