# Passos da Construção

Sequência cronológica do estudo.

## Fase 1

### Cenários 0 (tráfego normal) e 1 (alta carga)

#### Introdução do problema (Docker)

1. `products-service` com endpoint `GET /api/products`
2. `docker-compose.yml` com limite de memória (128M) e CPU (0.5)
3. load tests com k6
    1. cenário 0 (happy path) — 50 VUs, latência ok
    2. cenário 1 (high load) — 500 VUs, latência explode, Docker não reage
4. Prometheus + Grafana (dashboards: requests/s, latência p95, CPU, memória)

#### Solução (Kubernetes)

1. Minikube + manifests K8s (products-service + storage)
2. Probes (liveness + readiness)
3. Seed como Job no cluster
4. Serviços Grafana e Prometheus
5. HPA por CPU (50%) — escala de 1 a 5 pods automaticamente
6. Load test com scaling automático
7. Dashboards atualizados: pods ativos, requests por pod, métricas agregadas

## Fase 2

### Cenário 2 — App morre/trava

_(próximo)_

## Fase 3

### Cenário 3 — Fila acumula

_(próximo)_
