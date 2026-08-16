# Arquitetura

```mermaid
graph LR
  products-service[products-service<br>NestJS API] --> PostgreSQL[(PostgreSQL<br>products db)]
```

## Componentes

| Componente | Tipo | Descrição |
|---|---|---|
| products-service | API (NestJS) | Listagem e busca de produtos |
| PostgreSQL | Banco de dados | Armazena produtos |
