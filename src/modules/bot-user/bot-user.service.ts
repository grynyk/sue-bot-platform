import { Injectable } from '@nestjs/common';
import { CreateBotUserDto } from './dto/create-bot-user.dto';
import { UpdateBotUserDto } from './dto/update-bot-user.dto';

@Injectable()
export class BotUserService {
  create(createBotUserDto: CreateBotUserDto) {
    return 'This action adds a new botUser';
  }

  findAll() {
    return `This action returns all botUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} botUser`;
  }

  update(id: number, updateBotUserDto: UpdateBotUserDto) {
    return `This action updates a #${id} botUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} botUser`;
  }
}
