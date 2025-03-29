import { IsInt, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { BOT_USER_STATUS } from '@sue-bot-platform/types';

export class CreateBotUserActivityLogDto {
  @IsInt()
  @IsNotEmpty()
  @Expose({ name: 'id' })
  id: number;

  @IsInt()
  @IsNotEmpty()
  @Expose({ name: 'user_id' })
  userId: number;

  @IsEnum(BOT_USER_STATUS)
  @IsNotEmpty()
  @Expose({ name: 'status' })
  status: BOT_USER_STATUS;

  @IsDateString()
  @IsNotEmpty()
  @Expose({ name: 'date' })
  date: string;

  @IsDateString()
  @IsNotEmpty()
  @Expose({ name: 'created_at' })
  createdAt: string;
}
