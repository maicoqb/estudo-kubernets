import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  async process(payload: { orderId: number; totalPrice: number }) {
    // Simula processamento de pagamento (delay de 2s)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    this.logger.log(`Payment processed for order ${payload.orderId} - $${payload.totalPrice}`);
  }
}
