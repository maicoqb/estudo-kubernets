import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { connect, Channel } from 'amqplib';
import { PaymentsService } from './payments.service';

const EXCHANGE = 'orders';
const QUEUE = 'payments';
const ROUTING_KEY = 'order.created';

@Injectable()
export class RabbitMQConsumer implements OnModuleInit {
  private readonly logger = new Logger(RabbitMQConsumer.name);
  private channel!: Channel;

  constructor(private readonly paymentsService: PaymentsService) {}

  async onModuleInit() {
    const connection = await connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    this.channel = await connection.createChannel();

    await this.channel.assertExchange(EXCHANGE, 'topic', { durable: true });
    await this.channel.assertQueue(QUEUE, { durable: true });
    await this.channel.bindQueue(QUEUE, EXCHANGE, ROUTING_KEY);

    await this.channel.prefetch(100);

    this.channel.consume(QUEUE, async (msg) => {
      if (!msg) return;

      const payload = JSON.parse(msg.content.toString());
      this.logger.log(`Processing payment for order ${payload.orderId}`);

      await this.paymentsService.process(payload);

      this.channel.ack(msg);
    });

    this.logger.log('Consumer listening on queue: payments');
  }
}
