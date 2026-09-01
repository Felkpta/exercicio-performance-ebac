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

const BASE_URL = 'http://localhost:3000/api/public';

export default function () {
  // Teste no Endpoint Público de Produtos
  const resProdutos = http.get(`${BASE_URL}/products`);
  check(resProdutos, {
    'Produtos - Status é 200': (r) => r.status === 200,
  });

  // Teste no Endpoint Público de Clientes
  const resClientes = http.get(`${BASE_URL}/customers`);
  check(resClientes, {
    'Clientes - Status é 200': (r) => r.status === 200,
  });

  sleep(1);
}