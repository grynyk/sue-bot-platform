import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BotUser } from './bot-user.entity';
import { BOT_USER_STATUS } from '@sue-bot-platform/types';

@Entity()
export class BotUserActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BotUser, (user: BotUser) => user.statusLogs)
  @JoinColumn({ name: 'user_id' })
  user: BotUser;

  @Column({ type: 'enum', enum: BOT_USER_STATUS, default: BOT_USER_STATUS.INACTIVE })
  status: BOT_USER_STATUS;

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
