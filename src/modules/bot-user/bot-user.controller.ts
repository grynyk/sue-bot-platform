import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BotUserService } from './bot-user.service';
import { CreateBotUserDto } from './dto/create-bot-user.dto';
import { UpdateBotUserDto } from './dto/update-bot-user.dto';

@Controller('bot-user')
export class BotUserController {
  constructor(private readonly botUserService: BotUserService) {}

  @Post()
  create(@Body() createBotUserDto: CreateBotUserDto) {
    return this.botUserService.create(createBotUserDto);
  }

  @Get()
  findAll() {
    return this.botUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.botUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBotUserDto: UpdateBotUserDto) {
    return this.botUserService.update(+id, updateBotUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.botUserService.remove(+id);
  }
}
