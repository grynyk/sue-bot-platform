import { Module } from '@nestjs/common';
import { ServerMetricsService } from './services';
import { ServerMetricsController } from './controllers';

@Module({
  controllers: [ServerMetricsController],
  providers: [ServerMetricsService],
  exports: [ServerMetricsService],
})
export class ServerMetricsModule {}
