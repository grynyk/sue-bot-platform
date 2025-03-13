import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MessageToDelete, SEASON } from '../models/global-state.model';

@Entity()
export class GlobalState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: SEASON,
    default: SEASON.SUMMER,
  })
  season: SEASON;

  @Column({ type: 'json', default: [] })
  messages_to_delete: MessageToDelete[];
}
