import { PartialType } from '@nestjs/mapped-types';
import { CreateQueuedNotificationDto } from './create-queued-notification.dto';

export class UpdateQueuedNotificationDto extends PartialType(CreateQueuedNotificationDto) {}
