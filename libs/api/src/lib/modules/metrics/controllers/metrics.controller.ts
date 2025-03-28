import { Controller, Get } from '@nestjs/common';
import { MetricsService } from '../services';
import { ServerMetrics } from '../models';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly service: MetricsService) {}

  @Get()
  findAll(): Promise<ServerMetrics> {
    return this.service.getServerMetrics();
  }
}
