import { ADMIN_PANEL_USER_ROLE, ADMIN_PANEL_USER_STATUS } from '@sue-bot-platform/types';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class AdminPanelUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'timestamp', nullable: true, name: 'last_sign_in' })
  lastLogin: Date | null;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ADMIN_PANEL_USER_ROLE,
    default: ADMIN_PANEL_USER_ROLE.GUEST,
  })
  role: ADMIN_PANEL_USER_ROLE;

  @Column({
    type: 'enum',
    enum: ADMIN_PANEL_USER_STATUS,
    default: ADMIN_PANEL_USER_STATUS.ACTIVE,
  })
  status: ADMIN_PANEL_USER_STATUS;
}
