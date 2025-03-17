import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { QueuedNotification } from '../entities/queued-notification';
import { CreateQueuedNotificationDto } from '../dto/create-queued-notification.dto';

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
    if (!dto.user_id || !dto.notification_id) {
      throw new Error('user_id and notification_id are required');
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

  async findAllByUserId(user_id: string): Promise<QueuedNotification[]> {
    return this.repository.find({
      where: { user_id },
    });
  }

  async findAllScheduledForExactTime(currentTime: Date): Promise<QueuedNotification[]> {
    return this.repository.find({
      where: {
        send_time: currentTime,
        processed: false,
      },
    });
  }

  async findAllNotProcessedInTimeRangeByUserId(user_id: string, startTime: Date, endTime: Date): Promise<QueuedNotification[]> {
    return this.repository.find({
      where: {
        send_time: Between(startTime, endTime),
        processed: false,
        user_id,
      },
    });
  }

  async removeAllByUserIds(userIds: string[]): Promise<void> {
    await this.repository.delete({ user_id: In(userIds) });
  }

  async findAllNotProcessedInTimeRange(startTime: Date, endTime: Date): Promise<QueuedNotification[]> {
    return this.repository.find({
      where: {
        send_time: Between(startTime, endTime),
        processed: false,
      },
    });
  }

  async markAsProcessed(id: string): Promise<void> {
    await this.repository.update(id, { processed: true });
  }

  async removeAllByUserId(user_id: string): Promise<void> {
    await this.repository.delete({ user_id });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async drop(): Promise<void> {
    return this.repository.clear();
  }
}
