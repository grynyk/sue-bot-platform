import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QueuedNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: false })
  user_id: string;

  @Column('uuid', { nullable: false })
  notification_id: string;

  @Column({ type: 'timestamp' })
  send_time: Date;

  @Column({ default: false })
  processed: boolean;
}
