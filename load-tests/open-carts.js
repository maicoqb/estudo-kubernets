import http from 'k6/http';
import { check, sleep } from 'k6';

const cartIds = [];

export const options = {
  scenarios: {
    // Fase 1: abre carrinhos (open_carts sobe, dispara HPA)
    open_carts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 300 },
        { duration: '60s', target: 500 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '0s',
      exec: 'openCart',
    },
    // Fase 2: faz pedidos consumindo os carts (open_carts desce)
    place_orders: {
      executor: 'ramping-vus',
      startVUs: 0,
      startTime: '90s',
      stages: [
        { duration: '30s', target: 300 },
        { duration: '120s', target: 500 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '30s',
      exec: 'placeOrder',
    },
  },
};

export function openCart() {
  const res = http.post('http://localhost:3003/api/carts');

  check(res, {
    'cart created': (r) => r.status === 201,
  });

  if (res.status === 201) {
    cartIds.push(res.json('id'));
  }

  sleep(Math.random() * 2 + 1);
}

export function placeOrder() {
  const cartId = cartIds.shift();

  if (!cartId) {
    sleep(1);
    return;
  }

  const payload = JSON.stringify({
    cartId,
    productId: Math.floor(Math.random() * 100) + 1,
    quantity: Math.floor(Math.random() * 5) + 1,
    totalPrice: Number((Math.random() * 200 + 10).toFixed(2)),
  });

  const res = http.post('http://localhost:3002/api/orders', payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'order created': (r) => r.status === 201,
  });
}
