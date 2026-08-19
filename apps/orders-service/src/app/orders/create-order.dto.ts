export class CreateOrderDto {
  cartId!: string;
  productId!: number;
  quantity!: number;
  totalPrice!: number;
}
