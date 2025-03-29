import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { BOT_USER_STATUS, BotUserActivityMetrics } from '@sue-bot-platform/types';
import { BotUserActivityLog } from '../entities/bot-user-activity-log.entity';
import { CreateBotUserActivityLogDto } from '../dto/create-bot-user-activity-log.dto';
import { format } from 'date-fns';

@Injectable()
export class BotUserActivityService {
  constructor(
    @InjectRepository(BotUserActivityLog) private readonly repository: Repository<BotUserActivityLog>,
    @InjectPinoLogger() protected readonly logger: PinoLogger
  ) {}

  async create(dto: Partial<CreateBotUserActivityLogDto>): Promise<BotUserActivityLog> {
    if (!dto.userId) {
      throw new Error('userId is required');
    }
    const log: BotUserActivityLog = this.repository.create(dto);
    return this.repository.save(log);
  }

  async findAll(): Promise<BotUserActivityLog[]> {
    return this.repository.find();
  }

  async findAllByUserId(userId: string): Promise<BotUserActivityLog[]> {
    return this.repository.find({ where: { user: { id: userId } } });
  }

  async getMetricsByStatus(status: BOT_USER_STATUS): Promise<BotUserActivityMetrics[]> {
    const logs: BotUserActivityLog[] = await this.repository.find({
      where: { status },
      select: ['date', 'status'],
    });
    const metricsMap: Map<Date, number> = new Map<Date, number>();
    logs.forEach((log: BotUserActivityLog) => {
      const existing: number = metricsMap.get(log.date) || 0;
      metricsMap.set(log.date, existing + 1);
    });
    return Array.from(metricsMap, ([date, quantity]): BotUserActivityMetrics => ({ date: format(date, 'yyyy-MM-dd'), quantity }));
  }
}
