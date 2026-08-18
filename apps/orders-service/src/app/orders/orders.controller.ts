import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto.productId, dto.quantity, dto.totalPrice);
  }
}
