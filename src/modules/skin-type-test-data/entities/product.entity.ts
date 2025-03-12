import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SkinTypeTestResult } from './result.entity';
import { PRODUCT_SIZE, SEASON } from '../../../scenes/skin-type-test/enums/skin-test.enum';

@Entity()
export class SkinTypeTestProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'enum', enum: SEASON })
  season: string;

  @Column({ type: 'enum', enum: PRODUCT_SIZE })
  size: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'text' })
  ingredients: string;

  @Column({ type: 'text' })
  routine: string;

  @Column({ type: 'text' })
  recommendations: string;

  @ManyToOne(() => SkinTypeTestResult, (result) => result.products)
  @JoinColumn({ name: 'result_id' })
  result_id: SkinTypeTestResult;

  @Column({ type: 'uuid' })
  resultId: string;
}
