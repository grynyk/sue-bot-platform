import { BadRequestException, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BotUserDataService } from './services/bot-user-data.service';
import { BOT_USER_STATUS, BotUserActivityMetrics, BotUserStats } from '@sue-bot-platform/types';
import { BotUserActivityService } from './services/bot-user-activity.service';
import { JwtAuthGuard } from '../admin-panel-user-data';

@Controller('bot-users')
export class BotUserDataController {
  constructor(
    private readonly botUserDataService: BotUserDataService,
    private readonly botUserActivityService: BotUserActivityService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  getMetrics(): Promise<BotUserStats> {
    return this.botUserDataService.getStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get('metrics')
  async findMetricsPerDay(@Query('status') status: BOT_USER_STATUS): Promise<BotUserActivityMetrics[]> {
    if (!Object.values(BOT_USER_STATUS).includes(status)) {
      throw new BadRequestException(`Unsupported status: ${status}`);
    }
    return this.botUserActivityService.getMetricsByStatus(status);
  }
}
