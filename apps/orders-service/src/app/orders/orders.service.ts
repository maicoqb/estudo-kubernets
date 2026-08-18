import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { RabbitMQService } from '../rabbitmq.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async create(productId: number, quantity: number, totalPrice: number): Promise<Order> {
    const order = await this.ordersRepository.save({ productId, quantity, totalPrice });

    // Publica evento order.created para o payment-worker processar
    await this.rabbitMQService.publishOrderCreated({
      orderId: order.id,
      totalPrice,
    });

    return order;
  }
}
