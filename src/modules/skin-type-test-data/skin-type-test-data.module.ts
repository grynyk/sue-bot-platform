import { Module } from '@nestjs/common';
import { SkinTypeTestProductService } from './services/skin-type-test-product.service';
import { SkinTypeTestResultService } from './services/skin-type-test-result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkinTypeTestResult } from './entities/result.entity';
import { SkinTypeTestProduct } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkinTypeTestResult, SkinTypeTestProduct])],
  providers: [SkinTypeTestResultService, SkinTypeTestProductService],
  exports: [SkinTypeTestResultService, SkinTypeTestProductService],
})
export class SkinTypeTestDataModule {}
