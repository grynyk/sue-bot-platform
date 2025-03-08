import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SkinTypeTestProduct } from './product.entity';

@Entity()
export class SkinTypeTestResult {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'simple-array' })
  answerIds: number[];

  @Column({ type: 'varchar' })
  title: string;

  @OneToMany(() => SkinTypeTestProduct, (product: SkinTypeTestProduct): SkinTypeTestResult => product.skinTypeTestResult)
  products: SkinTypeTestProduct[];
}
