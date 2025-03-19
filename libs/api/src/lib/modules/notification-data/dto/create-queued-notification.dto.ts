import { Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsUUID } from 'class-validator';

export class CreateQueuedNotificationDto {
  @IsUUID()
  @Expose({ name: 'user_id' })
  userId: string;

  @IsUUID()
  @Expose({ name: 'notification_id' })
  notificationId: string;

  @IsDate()
  @Expose({ name: 'send_time' })
  sendTime: Date;

  @IsBoolean()
  processed: boolean;
}
