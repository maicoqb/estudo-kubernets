import { Injectable, NotFoundException } from '@nestjs/common';
import { Gauge } from 'prom-client';
import { randomUUID } from 'crypto';

const openCarts = new Gauge({
  name: 'open_carts',
  help: 'Number of open carts right now',
});

@Injectable()
export class CartsService {
  private carts = new Map<string, { createdAt: Date }>();

  create(): string {
    const id = randomUUID();
    this.carts.set(id, { createdAt: new Date() });
    openCarts.inc();
    return id;
  }

  delete(id: string): void {
    if (!this.carts.has(id)) {
      throw new NotFoundException(`Cart ${id} not found`);
    }
    this.carts.delete(id);
    openCarts.dec();
  }
}
