import { Controller, Post, Delete, Param, HttpCode } from '@nestjs/common';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @HttpCode(201)
  create() {
    const id = this.cartsService.create();
    return { id };
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    this.cartsService.delete(id);
  }
}
