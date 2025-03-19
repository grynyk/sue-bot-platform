import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BotUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'chat_id', type: 'bigint', unique: true })
  chatId: number;

  @Column({ name: 'first_name', type: 'varchar', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @Column({ name: 'skin_type', type: 'varchar', nullable: true })
  skinType: string;

  @Column({ name: 'language_code', type: 'varchar', nullable: true })
  language_code: string;

  @Column({ type: 'varchar' })
  timestamp: string;

  @Column({ name: 'wake_up_time', type: 'varchar', default: '08:00' })
  wakeUpTime: string;

  @Column({ name: 'bed_time', type: 'varchar', default: '23:00' })
  bedTime: string;

  @Column({ name: 'done_tasks_counter', type: 'bigint', default: 0 })
  doneTasksCounter: number;

  @Column({ name: 'notifications_enabled', type: 'boolean', default: true })
  notificationsEnabled: boolean;

  @Column({ type: 'boolean', default: false })
  blocked: boolean;

  @Column({ name: 'was_active_today', type: 'boolean', default: false })
  wasActiveToday: boolean;
}
