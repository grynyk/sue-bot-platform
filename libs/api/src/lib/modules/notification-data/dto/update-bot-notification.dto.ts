import { PartialType } from '@nestjs/mapped-types';
import { CreateBotNotificationDto } from './create-bot-notification.dto';

export class UpdateBotNotificationDto extends PartialType(CreateBotNotificationDto) {}
