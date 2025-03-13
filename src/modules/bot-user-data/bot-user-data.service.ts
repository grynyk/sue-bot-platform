import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { BotUser } from './entities/bot-user.entity';
import { CreateBotUserDto } from './dto/create-bot-user.dto';
import { UpdateBotUserDto } from './dto/update-bot-user.dto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { BotUserStats } from './models/bot-user-stats.model';
import { format } from 'date-fns';
import { isNil } from 'lodash';
@Injectable()
export class BotUserDataService {
  constructor(
    @InjectRepository(BotUser) private readonly repository: Repository<BotUser>,
    @InjectPinoLogger() protected readonly logger: PinoLogger
  ) {}

  async create(dto: Partial<CreateBotUserDto>): Promise<BotUser> {
    if (!dto.chat_id || !dto.username) {
      throw new Error('chat_id and username are required');
    }
    const notification = this.repository.create(dto);
    return this.repository.save(notification);
  }

  async findAll(): Promise<BotUser[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<BotUser> {
    return this.repository.findOneBy({ id });
  }

  async findByChatId(chat_id: number): Promise<BotUser> {
    return this.repository.findOneBy({ chat_id });
  }

  async findWithEnabledNotifications(): Promise<BotUser[]> {
    return this.repository.find({ where: { notifications_enabled: true, blocked: false } });
  }

  async update(chat_id: number, dto: Partial<UpdateBotUserDto>): Promise<BotUser> {
    try {
      const user: BotUser = await this.findByChatId(chat_id);
      if (isNil(user)) {
        throw new NotFoundException(`User with chat_id: ${chat_id} not found`);
      }
      Object.assign(user, { ...dto });
      return this.repository.save(user);
    } catch (error) {
      this.logger.error(`Bot user repo update(...): ${error.message}`);
    }
  }

  async incrementDoneTasksCounter(chat_id: number): Promise<BotUser> {
    const user: BotUser = await this.findByChatId(chat_id);
    if (isNil(user)) {
      throw new NotFoundException(`User with chat_id: ${chat_id} not found`);
    }
    user.done_tasks_counter = (user.done_tasks_counter || 0) + 1;
    return this.repository.save(user);
  }

  async getStats(): Promise<BotUserStats> {
    const total: number = await this.repository.count();
    const active: number = await this.repository.count({ where: { was_active_today: true } });
    const blocked: number = await this.repository.count({ where: { blocked: true } });
    const currentDate: string = format(new Date(), 'yyyy-MM-dd');
    const newToday: number = await this.repository.count({
      where: { timestamp: MoreThanOrEqual(`${currentDate}T00:00:00`) && LessThan(`${currentDate}T23:59:59`) },
    });
    const notificationsDisabled = await this.repository.count({ where: { notifications_enabled: false } });
    const changedNotificationTime: number = await this.repository.count({
      where: [{ wake_up_time: Not('08:00') }, { bed_time: Not('23:00') }],
    });
    const completedSkinTest: number = await this.repository.count({ where: { skin_type: Not(IsNull()) } });
    return {
      total,
      active,
      blocked,
      newToday,
      notificationsDisabled,
      changedNotificationTime,
      completedSkinTest,
    };
  }

  async resetFlagsCounters(): Promise<void> {
    await this.repository.update({}, { was_active_today: false, done_tasks_counter: 0 });
  }

  async remove(id: number): Promise<{ affected?: number }> {
    return this.repository.delete(id);
  }
}
