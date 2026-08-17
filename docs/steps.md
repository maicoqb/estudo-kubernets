# Passos da Construção

Sequência cronológica do estudo.

## Fase 1

### Cenários 0 (tráfego normal) e 1 (alta carga)

#### Introdução do problema

1. `products-service` com endpoint `GET /api/products`
2. `docker-compose.yml` com limite de memória (128M) e CPU (0.5)
3. load tests com k6
    1. cenário 0 (happy path) — 50 VUs, latência ok
    2. cenário 1 (high load) — 500 VUs, latência explode, Docker não reage
4. Prometheus + Grafana
