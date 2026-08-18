import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    // Tráfego constante por 2 minutos
    traffic: {
      executor: 'constant-vus',
      vus: 50,
      duration: '2m',
    },
    // Dispara hang no segundo 60
    hang: {
      executor: 'shared-iterations',
      iterations: 1,
      vus: 1,
      startTime: '60s',
      exec: 'hangApp',
    },
  },
};

export default function () {
  const res = http.get('http://localhost:3000/api/products');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(0.5);
}

export function hangApp() {
  http.post('http://localhost:3000/api/chaos/hang');
}
