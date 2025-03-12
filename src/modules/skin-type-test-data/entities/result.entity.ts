import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SkinTypeTestProduct } from './product.entity';

@Entity()
export class SkinTypeTestResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'simple-array' })
  answer_ids: number[];

  @Column({ type: 'varchar' })
  title: string;

  @OneToMany(() => SkinTypeTestProduct, (product: SkinTypeTestProduct): SkinTypeTestResult => product.result_id)
  products: SkinTypeTestProduct[];
}
