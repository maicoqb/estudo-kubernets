import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { RabbitMQService } from './rabbitmq.service';
import { HealthController } from './health.controller';
import { Order } from './orders/order.entity';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order]),
    MetricsModule,
  ],
  controllers: [OrdersController, HealthController],
  providers: [OrdersService, RabbitMQService],
})
export class AppModule {}
