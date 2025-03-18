import { PartialType } from '@nestjs/mapped-types';
import { CreateBotUserDto } from './create-bot-user.dto';

export class UpdateBotUserDto extends PartialType(CreateBotUserDto) {}
