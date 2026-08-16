import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { MetricsModule } from './metrics/metrics.module';
import { HealthController } from './health.controller';
import { Product } from './products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Product],
      synchronize: true,
    }),
    ProductsModule,
    MetricsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
