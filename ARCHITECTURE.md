# Arquitetura

```mermaid
graph LR
  products-service[products-service<br>NestJS API] --> PostgreSQL[(PostgreSQL)]
  carts-service[carts-service<br>NestJS API] --> Redis[(Redis)]
  orders-service[orders-service<br>NestJS API] --> PostgreSQL
  orders-service -->|DELETE /api/carts/:id| carts-service
  orders-service -->|order.created| RabbitMQ[(RabbitMQ)]
  RabbitMQ --> payments-worker[payments-worker<br>consumer]
  carts-service -- /api/metrics --> Prometheus
  products-service -- /api/metrics --> Prometheus
  RabbitMQ -- /metrics/per-object --> Prometheus
  Prometheus --> Grafana
```

## Componentes

| Componente | Tipo | Descrição |
|---|---|---|
| products-service | API (NestJS) | Listagem e busca de produtos |
| carts-service | API (NestJS) | Gerenciamento de carrinhos (Redis), expõe métrica `open_carts` |
| orders-service | API (NestJS) | Criação de pedidos, deleta carrinho via carts-service, publica eventos |
| payments-worker | Consumer (NestJS) | Processa pagamentos da fila |
| PostgreSQL | Banco de dados | Armazena produtos e pedidos |
| Redis | Cache/Store | Armazena carrinhos ativos |
| RabbitMQ | Broker | Fila de mensagens |
| Prometheus | Monitoramento | Coleta métricas das aplicações |
| Grafana | Dashboard | Visualização de métricas |

## Métricas e Autoscaling

| Cenário | Métrica | Ação |
|---|---|---|
| Excesso de chamadas | CPU utilization | HPA escala products-service |
| Fila acumula | `rabbitmq_queue_messages_ready` | KEDA escala payments-worker |
| Demanda alta (SLA) | `open_carts` (carts-service) | HPA escala orders-service proativamente |
