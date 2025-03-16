import { InlineKeyboardButton } from 'typegram';
import { RECURRENCE_PATTERN, SCHEDULE_TYPE } from '../models/notifications.model';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateBotNotificationDto {
  @IsArray()
  captions: string[];

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  buttons?: InlineKeyboardButton[];

  @IsEnum(SCHEDULE_TYPE)
  schedule_type: SCHEDULE_TYPE;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  offset?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(RECURRENCE_PATTERN)
  recurrence_pattern?: RECURRENCE_PATTERN[];
}
