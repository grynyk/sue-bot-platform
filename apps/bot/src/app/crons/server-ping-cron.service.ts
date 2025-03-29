import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';
import { GLOBAL_VARIABLES } from '@sue-bot-platform/core';
import axios, { AxiosResponse } from 'axios';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class ServerPingCronService {
  private readonly baseUrl: string;

  constructor(
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    private readonly configService: ConfigService
  ) {
    this.baseUrl = this.configService.getOrThrow<string>(GLOBAL_VARIABLES.HEROKU_URL);
  }

  /**
   * Pings the Heroku app to keep the dyno awake.
   * every 29 minutes
   */
  @Interval(29 * 60 * 1000)
  keepAwake(): void {
    this.logger.info(`Pinging ${this.baseUrl} to keep the dyno awake.`);
    axios
      .get(`${this.baseUrl}/api/notifications`)
      .then((response: AxiosResponse): void => {
        this.logger.info(`Ping successful. Status: ${response.status}`);
      })
      .catch((error): void => {
        this.logger.error(`Ping failed: ${error.message}`);
      });
  }
}
