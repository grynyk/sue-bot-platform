import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QueuedNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id', nullable: false })
  userId: string;

  @Column('uuid', { name: 'notification_id', nullable: false })
  notificationId: string;

  @Column({ name: 'send_time', type: 'timestamp' })
  sendTime: Date;

  @Column({ default: false })
  processed: boolean;
}
