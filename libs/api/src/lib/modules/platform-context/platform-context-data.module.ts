import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformContext } from './entities';
import { PlatformContextDataService } from './platform-context-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlatformContext])],
  providers: [PlatformContextDataService],
  exports: [PlatformContextDataService],
})
export class PlatformContextDataModule implements OnModuleInit {
  constructor(private readonly platformContextDataService: PlatformContextDataService) {}

  async onModuleInit(): Promise<void> {
    await this.platformContextDataService.init();
  }
}
