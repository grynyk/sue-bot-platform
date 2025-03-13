import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalState } from './entities/global-state.entity';
import { GlobalStateDataService } from './global-state-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalState])],
  providers: [GlobalStateDataService],
  exports: [GlobalStateDataService],
})
export class GlobalStateDataModule {}
