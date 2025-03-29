import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateBotNotificationDto } from '../dto/create-bot-notification.dto';
import { UpdateBotNotificationDto } from '../dto/update-bot-notification.dto';
import { BotNotification } from '../entities/bot-notification.entity';
import { InlineKeyboardButton } from 'typegram';

@Injectable()
export class NotificationDataService {
  constructor(
    @InjectRepository(BotNotification)
    private repository: Repository<BotNotification>
  ) {}

  async create(dto: CreateBotNotificationDto): Promise<BotNotification> {
    const notification: BotNotification = this.repository.create(dto);
    return this.repository.save(notification);
  }

  async findAll(): Promise<BotNotification[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<BotNotification> {
    return this.repository.findOneBy({ id });
  }

  async findAllActive(): Promise<BotNotification[]> {
    return this.repository.find({ where: { active: true } });
  }

  async countAll(): Promise<number> {
    const total: number = await this.repository.count();
    return total;
  }

  async countWithConfirmButton(): Promise<number> {
    const notificationsWithButtons: BotNotification[] = await this.repository.find({ where: { buttons: Not(IsNull()) } });
    const count: number = notificationsWithButtons.filter((notification: BotNotification): boolean =>
      notification.buttons.some((button: InlineKeyboardButton.CallbackButton): boolean => button.callback_data === 'CONFIRM')
    ).length;
    return count;
  }

  async update(id: string, dto: UpdateBotNotificationDto): Promise<BotNotification> {
    await this.repository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
