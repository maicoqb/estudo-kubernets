# Arquitetura

```mermaid
graph LR
  products-service[products-service<br>NestJS API] --> PostgreSQL[(PostgreSQL<br>products db)]
  products-service -- /api/metrics --> Prometheus
  Prometheus --> Grafana
```

## Componentes

| Componente | Tipo | Descrição |
|---|---|---|
| products-service | API (NestJS) | Listagem e busca de produtos |
| PostgreSQL | Banco de dados | Armazena produtos |
| Prometheus | Monitoramento | Coleta métricas da API |
| Grafana | Dashboard | Visualização de métricas |
