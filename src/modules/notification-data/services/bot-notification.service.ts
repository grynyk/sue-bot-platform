import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateBotNotificationDto } from '../dto/create-bot-notification.dto';
import { UpdateBotNotificationDto } from '../dto/update-bot-notification.dto';
import { BotNotification } from '../entities/bot-notification.entity';
import { InlineKeyboardButton } from 'typegram';
import { NAVIGATION_CALLBACK } from '@models/navigation.model';

@Injectable()
export class BotNotificationService {
  constructor(
    @InjectRepository(BotNotification)
    private repository: Repository<BotNotification>,
  ) {}

  async create(createBotNotificationDto: CreateBotNotificationDto): Promise<BotNotification> {
    const notification: BotNotification = this.repository.create(createBotNotificationDto);
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

  async countWithConfirmButton(): Promise<number> {
    const notificationsWithButtons: BotNotification[] = await this.repository.find({ where: { buttons: Not(IsNull()) } });
    const count: number = notificationsWithButtons.filter((notification: BotNotification): boolean =>
      notification.buttons.some((button: InlineKeyboardButton.CallbackButton): boolean => button.callback_data === NAVIGATION_CALLBACK.CONFIRM)
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
