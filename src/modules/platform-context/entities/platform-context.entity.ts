import { Column, Entity, PrimaryColumn } from 'typeorm';
import { SEASON } from '../models/platform-context.model';

@Entity()
export class PlatformContext {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'enum', enum: SEASON })
  season: SEASON;

  @Column({ type: 'boolean', default: true })
  notifications_enabled: boolean;
}
