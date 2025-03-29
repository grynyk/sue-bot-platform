import { InlineKeyboardButton } from 'typegram';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RECURRENCE_PATTERN, SCHEDULE_TYPE } from '../models/notifications.model';

@Entity()
export class BotNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  captions: string[];

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Column({ type: 'json', nullable: true })
  buttons?: InlineKeyboardButton[];

  @Column({ name: 'schedule_type', type: 'enum', enum: SCHEDULE_TYPE })
  scheduleType: SCHEDULE_TYPE;

  @Column({ type: 'time', nullable: true })
  time?: string;

  @Column({ type: 'bigint', nullable: true })
  offset?: number;

  @Column({ name: 'recurrence_pattern', type: 'enum', enum: RECURRENCE_PATTERN })
  recurrencePattern?: RECURRENCE_PATTERN[];

  @Column({ default: true })
  active: boolean;
}
