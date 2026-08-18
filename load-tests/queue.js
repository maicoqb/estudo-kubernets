import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 50 },
    { duration: '60s', target: 200 },
    { duration: '20s', target: 200 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const payload = JSON.stringify({
    productId: Math.floor(Math.random() * 100) + 1,
    quantity: Math.floor(Math.random() * 5) + 1,
    totalPrice: Number((Math.random() * 200 + 10).toFixed(2)),
  });

  const res = http.post('http://localhost:3002/api/orders', payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'status is 201': (r) => r.status === 201,
  });
}
