import { PartialType } from '@nestjs/mapped-types';
import { CreateBotUserActivityLogDto } from './create-bot-user-activity-log.dto';

export class UpdateBotUserActivityLogDto extends PartialType(CreateBotUserActivityLogDto) {}
