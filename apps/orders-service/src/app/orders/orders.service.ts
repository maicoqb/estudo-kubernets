import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { RabbitMQService } from '../rabbitmq.service';

const CARTS_SERVICE_URL = process.env.CARTS_SERVICE_URL || 'http://carts-service:3000';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async create(cartId: string, productId: number, quantity: number, totalPrice: number): Promise<Order> {
    const order = await this.ordersRepository.save({ productId, quantity, totalPrice });

    // Publica evento order.created para o payment-worker processar
    await this.rabbitMQService.publishOrderCreated({
      orderId: order.id,
      totalPrice,
    });

    // Fecha o carrinho no carts-service
    await fetch(`${CARTS_SERVICE_URL}/api/carts/${cartId}`, { method: 'DELETE' });

    return order;
  }
}
