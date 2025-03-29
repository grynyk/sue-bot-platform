import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { BotUser } from './entities/bot-user.entity';
import { CreateBotUserDto } from './dto/create-bot-user.dto';
import { UpdateBotUserDto } from './dto/update-bot-user.dto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { BotUserStats } from './models/bot-user-stats.model';
import { format, startOfToday } from 'date-fns';
import { isNil } from 'lodash';

@Injectable()
export class BotUserDataService {
  constructor(
    @InjectRepository(BotUser) private readonly repository: Repository<BotUser>,
    @InjectPinoLogger() protected readonly logger: PinoLogger
  ) {}

  async create(dto: Partial<CreateBotUserDto>): Promise<BotUser> {
    if (!dto.chatId) {
      throw new Error('chatId is required');
    }
    const notification = this.repository.create(dto);
    return this.repository.save(notification);
  }

  async findAll(): Promise<BotUser[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<BotUser> {
    const user: BotUser = await this.repository.findOneBy({ id });
    return {
      ...user,
      chatId: Number(user.chatId),
      doneTasksCounter: Number(user.doneTasksCounter),
    };
  }

  async findByChatId(chatId: number): Promise<BotUser> {
    return this.repository.findOneBy({ chatId });
  }

  async findWithEnabledNotifications(): Promise<BotUser[]> {
    return this.repository.find({ where: { notificationsEnabled: true, blocked: false } });
  }

  async markUsersAsBlocked(userIds: string[]): Promise<void> {
    await this.repository.update({ id: In(userIds) }, { blocked: true });
  }

  async update(chatId: number, dto: Partial<UpdateBotUserDto>): Promise<BotUser> {
    try {
      const user: BotUser = await this.findByChatId(chatId);
      if (isNil(user)) {
        throw new NotFoundException(`User with chatId: ${chatId} not found`);
      }
      Object.assign(user, { ...dto });
      return this.repository.save(user);
    } catch (error) {
      this.logger.error(`Bot user repo update(...): ${error.message}`);
      throw error;
    }
  }

  async incrementDoneTasksCounter(chatId: number): Promise<BotUser> {
    const user: BotUser = await this.findByChatId(chatId);
    if (isNil(user)) {
      throw new NotFoundException(`User with chatId: ${chatId} not found`);
    }
    user.doneTasksCounter = (user.doneTasksCounter || 0) + 1;
    return this.repository.save(user);
  }

  async getStats(): Promise<BotUserStats> {
    const total: number = await this.repository.count();
    const active: number = await this.repository.count({ where: { wasActiveToday: true } });
    const blocked: number = await this.repository.count({ where: { blocked: true } });
    const newToday: number = await this.repository.count({
      where: {
        timestamp: MoreThanOrEqual(format(startOfToday(), 'yyyy-MM-dd')),
      },
    });
    const notificationsDisabled = await this.repository.count({ where: { notificationsEnabled: false } });
    const changedNotificationTime: number = await this.repository.count({
      where: [{ wakeUpTime: Not('07:00') }, { bedTime: Not('22:10') }],
    });
    const completedSkinTest: number = await this.repository.count({ where: { skinType: Not(IsNull()) } });
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
    await this.repository.update({}, { wasActiveToday: false, doneTasksCounter: 0 });
  }

  async remove(id: number): Promise<{ affected?: number }> {
    return this.repository.delete(id);
  }
}
