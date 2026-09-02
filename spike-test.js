import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 2 },
    { duration: '5s', target: 50 }, // Pico repentino de 50 VUs
    { duration: '10s', target: 50 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  const res = http.get('http://localhost:3000/api/_health/ready');
  check(res, {
    'Status é 200/204': (r) => r.status === 200 || r.status === 204,
  });
  sleep(1);
}