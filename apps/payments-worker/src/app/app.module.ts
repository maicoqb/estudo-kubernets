import { Module } from '@nestjs/common';
import { RabbitMQConsumer } from './rabbitmq.consumer';
import { PaymentsService } from './payments.service';

@Module({
  providers: [RabbitMQConsumer, PaymentsService],
})
export class AppModule {}
