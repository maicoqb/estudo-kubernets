# Cenário 0 — Happy Path

App funcionando normalmente sob carga moderada.

## Como rodar

```bash
docker compose up --build
```

| Serviço | URL |
|---------|-----|
| API | http://localhost:3000/api/products |
| Grafana | http://localhost:3001 (admin/admin) |
| Prometheus | http://localhost:9090 |

## Dashboards

| Dashboard | URL |
|-----------|-----|
| Products Service | http://localhost:3001/d/products-service/products-service |

## Seed

Popula o banco com 100 produtos. Rode uma vez após subir o docker:

```bash
npm run seed:products
```

## Load Test

```bash
npm run test:happy-path
```

Script: `load-tests/happy-path.js` — 50 VUs por 30s.

## Resultado

50 usuários simultâneos por 30 segundos:

| Métrica | Valor |
|---------|-------|
| Requests totais | ~5100 (~170 req/s) |
| Taxa de sucesso (HTTP) | 100% |
| Latência média | 95ms |
| Abaixo de 500ms | 96% |
| Acima de 500ms | 4% |

## Dashboard
![happy-path-dashboard](./happy-path-dashboard.png)