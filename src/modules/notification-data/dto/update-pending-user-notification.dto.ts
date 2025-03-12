import { PartialType } from '@nestjs/mapped-types';
import { CreatePendingUserNotificationsDto } from './create-pending-user-notification.dto';

export class UpdatePendingUserNotificationsDto extends PartialType(CreatePendingUserNotificationsDto) {}
