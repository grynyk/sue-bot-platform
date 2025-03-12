import { IsBoolean, IsDate, IsUUID } from 'class-validator';

export class CreatePendingUserNotificationsDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  notification_id: string;

  @IsDate()
  send_time: Date;

  @IsBoolean()
  sent: boolean;
}
