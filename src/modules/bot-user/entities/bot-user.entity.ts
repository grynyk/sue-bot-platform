import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BotUser {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'bigint', unique: true })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  first_name: string;

  @Column({ type: 'varchar', nullable: true })
  last_name: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  skin_type: string;

  @Column({ type: 'varchar' })
  timestamp: string;

  @Column({ type: 'varchar', default: '08:00' })
  wake_up_time: string;

  @Column({ type: 'varchar', default: '23:00' })
  bed_time: string;

  @Column({ type: 'bigint', default: 0 })
  done_tasks_counter: number;

  @Column({ type: 'boolean', default: true })
  notifications_enabled: boolean;

  @Column({ type: 'boolean', default: false })
  was_active_today: boolean;
}
