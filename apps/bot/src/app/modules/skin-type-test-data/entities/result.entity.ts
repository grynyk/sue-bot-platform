import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SkinTypeTestProduct } from './product.entity';

@Entity()
export class SkinTypeTestResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { name: 'answer_ids', array: true, default: [] })
  answerIds: number[];

  @Column({ type: 'varchar' })
  title: string;

  @OneToMany(() => SkinTypeTestProduct, (product: SkinTypeTestProduct): SkinTypeTestResult => product.resultId)
  products: SkinTypeTestProduct[];
}
