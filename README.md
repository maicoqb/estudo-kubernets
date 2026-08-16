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

## Seed

Popula o banco com 100 produtos. Rode uma vez após subir o docker:

```bash
npm run seed:products
```

## Load Tests

Os testes de carga rodam via k6 em container Docker separado.

```bash
npm run load-test
```

Scripts disponíveis em `load-tests/`:

| Script | Cenário | Descrição |
|--------|---------|-----------|
| happy-path.js | 0 | 50 VUs por 30s — valida que a API responde normalmente |

### Resultado do happy-path

50 usuários simultâneos por 30 segundos:

| Métrica | Valor |
|---------|-------|
| Requests totais | ~5100 (~170 req/s) |
| Taxa de sucesso (HTTP) | 100% |
| Latência média | 95ms |
| Abaixo de 500ms | 96% |
| Acima de 500ms | 4% |

## Documentação

- [Arquitetura](./ARCHITECTURE.md)
