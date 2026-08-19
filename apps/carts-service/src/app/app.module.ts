import { Module } from '@nestjs/common';
import { CartsModule } from './carts/carts.module';
import { MetricsModule } from './metrics/metrics.module';
import { HealthController } from './health.controller';

@Module({
  imports: [CartsModule, MetricsModule],
  controllers: [HealthController],
})
export class AppModule {}
