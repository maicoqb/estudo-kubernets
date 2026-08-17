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

#### Solução (Kubernetes)

1. Minikube + manifests K8s (namespace, postgres StatefulSet, products-service Deployment)
2. Probes (liveness + readiness)
3. Seed como Job no cluster
4. Script de deploy automatizado
5. _(próximo)_ HPA por latência
6. _(próximo)_ Load test com scaling automático

## Fase 2

### Cenário 2 — App morre/trava

_(próximo)_

## Fase 3

### Cenário 3 — Fila acumula

_(próximo)_
