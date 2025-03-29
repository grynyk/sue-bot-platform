import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { QueuedNotification } from '../entities/queued-notification';
import { CreateQueuedNotificationDto } from '../dto/create-queued-notification.dto';
import { QueuedNotificationsMetrics } from '../models';

@Injectable()
export class QueuedNotificationDataService {
  constructor(
    @InjectRepository(QueuedNotification)
    private repository: Repository<QueuedNotification>
  ) {}

  async bulkInsert(notifications: Partial<QueuedNotification>[]) {
    await this.repository.insert(notifications);
  }

  async create(dto: CreateQueuedNotificationDto): Promise<QueuedNotification> {
    if (!dto.userId || !dto.notificationId) {
      throw new Error('userId and notificationId are required');
    }
    const notification: QueuedNotification = this.repository.create(dto);
    return this.repository.save(notification);
  }

  async findAll(): Promise<QueuedNotification[]> {
    return this.repository.find({});
  }

  async findOne(id: string): Promise<QueuedNotification> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findAllByUserId(userId: string): Promise<QueuedNotification[]> {
    return this.repository.find({
      where: { userId },
    });
  }

  async findAllScheduledForExactTime(currentTime: Date): Promise<QueuedNotification[]> {
    return this.repository.find({
      where: {
        sendTime: currentTime,
        processed: false,
      },
    });
  }

  async findAllNotProcessedInTimeRangeByUserId(userId: string, startTime: Date, endTime: Date): Promise<QueuedNotification[]> {
    return this.repository.find({
      where: {
        sendTime: Between(startTime, endTime),
        processed: false,
        userId,
      },
    });
  }

  async removeAllByUserIds(userIds: string[]): Promise<void> {
    await this.repository.delete({ userId: In(userIds) });
  }

  async findAllNotProcessedInTimeRange(startTime: Date, endTime: Date): Promise<QueuedNotification[]> {
    return this.repository.find({
      where: {
        sendTime: Between(startTime, endTime),
        processed: false,
      },
    });
  }

  async markAsProcessed(id: string): Promise<void> {
    await this.repository.update(id, { processed: true });
  }

  async removeAllByUserId(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getMetrics(): Promise<QueuedNotificationsMetrics> {
    const total: number = await this.repository.count();
    const queued: number = await this.repository.count({
      where: {
        processed: false,
      },
    });
    const processed: number = await this.repository.count({
      where: {
        processed: true,
      },
    });
    return {
      total,
      queued,
      processed,
    };
  }

  async drop(): Promise<void> {
    return this.repository.clear();
  }
}
