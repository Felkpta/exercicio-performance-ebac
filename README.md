# Testes de Performance com k6 - EBAC Store Server

Este repositório contém a suíte de testes de performance automatizados utilizando o **k6**, desenvolvida para o servidor local `ebac-demo-store-server`.

## 🎯 Aplicação Alvo

- **Aplicação:** `ebac-demo-store-server` (Node.js/NestJS)
- **Base URL:** `http://localhost:3000/api`
- **Endpoints Validados:** 
  - `GET /_health/live`
  - `GET /_health/ready`

---

## 🛠️ Como Preparar e Executar o Ambiente

1. Iniciar o servidor da aplicação:
   ```bash
   cd ebac-demo-store-server
   npm install
   npm run start