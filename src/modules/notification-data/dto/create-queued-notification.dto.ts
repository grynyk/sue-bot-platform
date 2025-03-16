import { IsBoolean, IsDate, IsUUID } from 'class-validator';

export class CreateQueuedNotificationDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  notification_id: string;

  @IsDate()
  send_time: Date;

  @IsBoolean()
  processed: boolean;
}
