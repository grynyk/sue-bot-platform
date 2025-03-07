import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BotUser } from './entities/bot-user.entity';
import { CreateBotUserDto } from './dto/create-bot-user.dto';
import { UpdateBotUserDto } from './dto/update-bot-user.dto';

@Injectable()
export class BotUserDataService {
  constructor(@InjectRepository(BotUser) private readonly userRepository: Repository<BotUser>) {}

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

  update(id: number, updateUserDto: UpdateBotUserDto): Promise<BotUser> {
    const user: BotUser = new BotUser();
    user.first_name = updateUserDto.first_name;
    user.last_name = updateUserDto.last_name;
    user.username = updateUserDto.username;
    user.skin_type = updateUserDto.skin_type;
    user.wake_up_time = updateUserDto.wake_up_time;
    user.bed_time = updateUserDto.bed_time;
    user.done_tasks_counter = updateUserDto.done_tasks_counter;
    user.notifications_enabled = updateUserDto.notifications_enabled;
    user.was_active_today = updateUserDto.was_active_today;
    user.timestamp = updateUserDto.timestamp;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  drop(): Promise<void> {
    return this.userRepository.clear();
  }
}
