import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GLOBAL_VARIABLES } from '@sue-bot-platform/core';
import axios, { AxiosResponse } from 'axios';
import { ServerMetrics } from '../models/server-metrics.model';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class ServerMetricsService {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    private readonly configService: ConfigService
  ) {
    this.baseUrl = this.configService.get<string>(GLOBAL_VARIABLES.HEROKU_API_URL);
    this.token = this.configService.get<string>(GLOBAL_VARIABLES.HEROKU_API_TOKEN);
  }

  async getMetrics(): Promise<ServerMetrics> {
    try {
      const headers = {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/vnd.heroku+json; version=3',
      };
      const serverData: AxiosResponse = await axios.get(`${this.baseUrl}`, { headers });
      const dynoData: AxiosResponse = await axios.get(`${this.baseUrl}/dynos`, { headers });
      return {
        state: dynoData.data.length ? dynoData.data[0].state : null,
        maintenance: serverData.data.maintenance,
        releaseDate: serverData.data.released_at,
      };
    } catch (error) {
      this.logger.error(`Bot user repo update(...): ${error.message}`);
      return {
        state: null,
        maintenance: null,
        releaseDate: null,
      };
    }
  }
}
