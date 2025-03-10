import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { BotUser } from './entities/bot-user.entity';
import { CreateBotUserDto } from './dto/create-bot-user.dto';
import { UpdateBotUserDto } from './dto/update-bot-user.dto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { BotUserStats } from './models/bot-user-stats.model';
import { format } from 'date-fns';
@Injectable()
export class BotUserDataService {
  constructor(@InjectRepository(BotUser) private readonly userRepository: Repository<BotUser>,  @InjectPinoLogger() protected readonly logger: PinoLogger) {}

  create(createUserDto: Partial<CreateBotUserDto>): Promise<BotUser> {
    const user: BotUser = new BotUser();
    user.id = createUserDto.id;
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.username = createUserDto.username;
    user.skin_type = createUserDto.skin_type;
    user.wake_up_time = createUserDto.wake_up_time;
    user.bed_time = createUserDto.bed_time;
    user.done_tasks_counter = createUserDto.done_tasks_counter;
    user.notifications_enabled = createUserDto.notifications_enabled;
    user.was_active_today = createUserDto.was_active_today;
    user.timestamp = createUserDto.timestamp;
    return this.userRepository.save(user);
  }

  findAll(): Promise<BotUser[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<BotUser> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: Partial<UpdateBotUserDto>): Promise<BotUser> {
    try {
      const user: BotUser = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      Object.assign(user, {...updateUserDto, was_active_today: true });
      return this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async getStats(): Promise<BotUserStats> {
    const total: number = await this.userRepository.count();
    const active: number = await this.userRepository.count({ where: { was_active_today: true } });
    const currentDate: string = format(new Date(), 'yyyy-MM-dd');
    const newToday: number = await this.userRepository.count({ where: { timestamp: MoreThanOrEqual(`${currentDate}T00:00:00`) && LessThan(`${currentDate}T23:59:59`) } });
    const notificationsDisabled = await this.userRepository.count({ where: { notifications_enabled: false } });
    const changedNotificationTime: number = await this.userRepository.count({ where: [{ wake_up_time: Not('08:00') }, { bed_time: Not('23:00') }] });
    const completedSkinTest: number = await this.userRepository.count({ where: { skin_type: Not(IsNull()) } });
    return {
      total,
      active,
      newToday,
      notificationsDisabled,
      changedNotificationTime,
      completedSkinTest,
    };
  }

  async resetFlags(): Promise<void> {
    await this.userRepository.update({}, { was_active_today: false, done_tasks_counter: 0 });
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  drop(): Promise<void> {
    return this.userRepository.clear();
  }
}
