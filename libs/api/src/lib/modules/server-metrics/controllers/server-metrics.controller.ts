import { Controller, Get } from '@nestjs/common';
import { ServerMetricsService } from '../services';
import { ServerMetrics } from '@sue-bot-platform/types';
@Controller('server')
export class ServerMetricsController {
  constructor(private readonly service: ServerMetricsService) {}

  @Get('metrics')
  findAll(): Promise<ServerMetrics> {
    return this.service.getMetrics();
  }
}
