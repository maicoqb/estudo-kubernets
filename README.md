# Estudo Kubernetes

Estudo de caso sobre Kubernetes usando uma e-store como exemplo. Começamos com Docker, simulando cenários reais de falha e limitações de orquestração. Depois introduzimos o Kubernetes e mostramos como ele resolve esses mesmos problemas automaticamente.

## Cenários

| # | Cenário | Problema (Docker) | Solução (Kubernetes) |
|---|---------|-------------------|---------------------|
| 0 | Feliz | App funcionando normalmente | App funcionando normalmente |
| 1 | Excesso de chamadas | App degrada, sem reação | HPA escala por CPU |
| 2 | App morre/trava | Container fica unhealthy, sem recuperação | Probes detectam e reiniciam |
| 3 | Fila acumula | Workers não dão conta, pedidos atrasam | KEDA escala workers por tamanho da fila |
| 4 | Busca lenta (SLA violado) | App saudável mas experiência degradada | HPA escala por métrica custom de negócio |

## Como rodar

```bash
docker compose up --build
```

A API fica disponível em `http://localhost:3000/api/products`.

## Documentação

- [Arquitetura](./ARCHITECTURE.md)
