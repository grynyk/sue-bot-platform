import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BotUser } from './entities/bot-user.entity';
import { CreateBotUserDto } from './dto/create-bot-user.dto';
import { UpdateBotUserDto } from './dto/update-bot-user.dto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
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
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      Object.assign(user, updateUserDto);
      return this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  drop(): Promise<void> {
    return this.userRepository.clear();
  }
}
