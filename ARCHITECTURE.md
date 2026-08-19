# Arquitetura

```mermaid
graph LR
  products-service[products-service<br>NestJS API] --> PostgreSQL[(PostgreSQL)]
  orders-service[orders-service<br>NestJS API] --> PostgreSQL
  orders-service -->|order.created| RabbitMQ[(RabbitMQ)]
  RabbitMQ --> payments-worker[payments-worker<br>consumer]
  products-service -- /api/metrics --> Prometheus
  RabbitMQ -- /metrics/per-object --> Prometheus
  Prometheus --> Grafana
```

## Componentes

| Componente | Tipo | Descrição |
|---|---|---|
| products-service | API (NestJS) | Listagem e busca de produtos |
| orders-service | API (NestJS) | Criação de pedidos, publica eventos |
| payments-worker | Consumer (NestJS) | Processa pagamentos da fila |
| PostgreSQL | Banco de dados | Armazena produtos e pedidos |
| RabbitMQ | Broker | Fila de mensagens |
| Prometheus | Monitoramento | Coleta métricas da API |
| Grafana | Dashboard | Visualização de métricas |
