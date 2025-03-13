import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreatePendingUserNotificationsDto } from '../dto/create-pending-user-notification.dto';
import { PendingUserNotification } from '../entities/pending-user-notification.entity';

@Injectable()
export class PendingUserNotificationService {
  constructor(
    @InjectRepository(PendingUserNotification)
    private repository: Repository<PendingUserNotification>,
  ) {}

  async create(dto: CreatePendingUserNotificationsDto): Promise<PendingUserNotification> {
    if (!dto.user_id || !dto.notification_id) {
      throw new Error('user_id and notification_id are required');
    }
    const notification = this.repository.create(dto);
    return this.repository.save(notification);
  }
  

  async findAll(): Promise<PendingUserNotification[]> {
    return this.repository.find({});
  }

  async findOne(id: string): Promise<PendingUserNotification> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findAllByUserId(user_id: string): Promise<PendingUserNotification[]> {
    return this.repository.find({
      where: { user_id }
    });
  }

  async findAllScheduledForExactTime(currentTime: Date): Promise<PendingUserNotification[]> {
    return this.repository.find({
      where: {
        send_time: currentTime,
        sent: false,
      },
    });
  }

  async findAllUnsentInTimeRange(startTime: Date, endTime: Date): Promise<PendingUserNotification[]> {
    return this.repository.find({
      where: {
        send_time: Between(startTime, endTime),
        sent: false,
      },
    });
  }

  async markAsSent(id: string): Promise<void> {
    await this.repository.update(id, { sent: true });
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
