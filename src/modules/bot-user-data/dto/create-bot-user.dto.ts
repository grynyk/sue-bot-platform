import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateBotUserDto {
  @IsNotEmpty()
  @IsNumber()
  chat_id: number;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  skin_type?: string;

  @IsString()
  @IsOptional()
  @Matches(/^(?:0[1-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'Wake-up time must be in the format HH:MM.',
  })
  wake_up_time = '08:00';

  @IsString()
  @IsOptional()
  @Matches(/^(?:0[1-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'Bed time must be in the format HH:MM.',
  })
  bed_time = '23:00';

  @IsString()
  @IsOptional()
  language_code?: string;

  @IsInt()
  done_tasks_counter = 0;

  @IsBoolean()
  notifications_enabled = true;

  @IsBoolean()
  blocked = false;

  @IsBoolean()
  was_active_today = false;

  @IsDateString()
  timestamp: string;
}
