import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect, Channel } from 'amqplib';

const EXCHANGE = 'orders';
const ROUTING_KEY = 'order.created';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection!: Awaited<ReturnType<typeof connect>>;
  private channel!: Channel;

  async onModuleInit() {
    this.connection = await connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(EXCHANGE, 'topic', { durable: true });
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
  }

  async publishOrderCreated(message: object) {
    this.channel.publish(
      EXCHANGE,
      ROUTING_KEY,
      Buffer.from(JSON.stringify(message)),
      { persistent: true },
    );
  }
}
