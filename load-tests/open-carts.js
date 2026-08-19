import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    // Fase 1: abre carrinhos (leading indicator para o HPA)
    open_carts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 300 },
        { duration: '60s', target: 500 },
        { duration: '30s', target: 0 },
      ],
      exec: 'addToCart',
    },
    // Fase 2: burst de pedidos começa após 40s
    place_orders: {
      executor: 'ramping-vus',
      startVUs: 0,
      startTime: '40s',
      stages: [
        { duration: '20s', target: 200 },
        { duration: '40s', target: 500 },
        { duration: '20s', target: 0 },
      ],
      exec: 'placeOrder',
    },
  },
};

export function addToCart() {
  const res = http.post('http://localhost:3002/api/cart');

  check(res, {
    'cart added': (r) => r.status === 201,
  });

  sleep(Math.random() * 5 + 2);
}

export function placeOrder() {
  const payload = JSON.stringify({
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
