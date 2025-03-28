import { Controller, Get } from '@nestjs/common';
import { ServerMetricsService } from '../services';
import { ServerMetrics } from '../models';

@Controller('server-metrics')
export class ServerMetricsController {
  constructor(private readonly service: ServerMetricsService) {}

  @Get()
  findAll(): Promise<ServerMetrics> {
    return this.service.getMetrics();
  }
}
