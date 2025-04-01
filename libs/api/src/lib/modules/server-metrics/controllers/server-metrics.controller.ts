import { Controller, Get, UseGuards } from '@nestjs/common';
import { ServerMetricsService } from '../services';
import { ServerMetrics } from '@sue-bot-platform/types';
import { JwtAuthGuard } from '../../admin-panel-user-data/guards';
@Controller('server')
export class ServerMetricsController {
  constructor(private readonly service: ServerMetricsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('metrics')
  findAll(): Promise<ServerMetrics> {
    return this.service.getMetrics();
  }
}
