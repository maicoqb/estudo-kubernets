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

### Cenário 2 — App trava (Hang)

#### Introdução do problema (Docker)

1. Endpoint `/api/chaos/hang` — trava o event loop após 1s
2. Load test com k6 — dispara hang no segundo 60
3. Docker não detecta (container fica "running")

#### Solução (Kubernetes)

1. livenessProbe detecta que /api/health não responde
2. K8s sobe um novo pod e mata o antigo
3. Requests voltam ao normal

## Fase 3

### Cenário 3 — Fila acumula

#### Introdução do problema (Docker)

1. `orders-service` com endpoint `POST /api/orders` — publica evento no RabbitMQ
2. `payments-worker` consome da fila e processa pagamentos
3. Load test com burst de pedidos — fila cresce, workers não acompanham
4. Docker não escala workers automaticamente

#### Solução (Kubernetes)

1. Deployment do orders-service + payments-worker
2. KEDA instalado no cluster (ScaledObject por tamanho da fila)
3. `rabbitmq_queue_messages_ready` > threshold → KEDA escala payments-worker
4. Fila é consumida, workers extras são removidos após cooldown

## Fase 4

### Cenário 4 — Carrinhos abertos (métrica custom)

#### Introdução do problema (Docker)

1. `carts-service` com métrica custom `open_carts` (gauge via prom-client)
2. `orders-service` chama `carts-service`
3. Load test — muitos carrinhos abertos, seguido de pico de orders
4. Docker não reage à demanda iminente, latência cresce

#### Solução (Kubernetes)

1. Deployment do carts-service
2. Prometheus scrape do carts-service e custom metrics com Prometheus Adapter
3. HPA do orders-service com base na métrica `open_carts`
4. `open_carts` > 1000 → HPA escala orders-service proativamente
5. Mais pods absorvem o pico de checkout sem degradar tanto a latência
