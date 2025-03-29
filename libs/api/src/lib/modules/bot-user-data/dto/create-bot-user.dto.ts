import { IsInt, IsNotEmpty, IsString, Matches, IsOptional, IsDateString, IsBoolean, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateBotUserDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'chat_id' })
  chatId: number;

  @IsString()
  @IsOptional()
  @Expose({ name: 'first_name' })
  firstName?: string;

  @IsString()
  @IsOptional()
  @Expose({ name: 'last_name' })
  lastName?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  @Expose({ name: 'skin_type' })
  skinType?: string;

  @IsString()
  @IsOptional()
  @Matches(/^(?:0[1-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'Wake-up time must be in the format HH:MM.',
  })
  @Expose({ name: 'wake_up_time' })
  wakeUpTime = '08:00';

  @IsString()
  @IsOptional()
  @Matches(/^(?:0[1-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'Bed time must be in the format HH:MM.',
  })
  @Expose({ name: 'bed_time' })
  bedTime = '23:00';

  @IsString()
  @IsOptional()
  @Expose({ name: 'language_code' })
  languageCode?: string;

  @IsInt()
  @Expose({ name: 'done_tasks_counter' })
  doneTasksCounter = 0;

  @IsBoolean()
  @Expose({ name: 'notifications_enabled' })
  notificationsEnabled = true;

  @IsBoolean()
  blocked = false;

  @IsBoolean()
  @Expose({ name: 'was_active_today' })
  wasActiveToday = false;

  @IsDateString()
  timestamp: string;
}
