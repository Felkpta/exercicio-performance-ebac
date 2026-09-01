import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 5 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = 'http://localhost:3000/api';

export default function () {
  // Teste de Healthcheck Live
  const resLive = http.get(`${BASE_URL}/_health/live`);
  check(resLive, {
    'Health Live - Sucesso (200/204)': (r) => r.status === 200 || r.status === 204,
  });

  // Teste de Healthcheck Ready
  const resReady = http.get(`${BASE_URL}/_health/ready`);
  check(resReady, {
    'Health Ready - Sucesso (200/204)': (r) => r.status === 200 || r.status === 204,
  });

  sleep(1);
}