import { InlineKeyboardButton } from 'typegram';
import { RECURRENCE_PATTERN, SCHEDULE_TYPE } from '../models/notifications.model';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

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
  @Expose({ name: 'schedule_type' })
  scheduleType: SCHEDULE_TYPE;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  offset?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(RECURRENCE_PATTERN)
  @Expose({ name: 'recurrence_pattern' })
  recurrencePattern?: RECURRENCE_PATTERN[];
}
