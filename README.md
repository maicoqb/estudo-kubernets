# Estudo Kubernetes

Estudo de caso sobre Kubernetes usando uma e-store como exemplo. Começamos com Docker, simulando cenários reais de falha e limitações de orquestração. Depois introduzimos o Kubernetes e mostramos como ele resolve esses mesmos problemas automaticamente.

## Cenários

Mais informações nos arquivo específicos de cada cenário.

| # | Cenário | Problema (Docker) | Solução (Kubernetes) |
|---|---------|-------------------|---------------------|
| 0 | [Caminho Feliz](./docs/happy-path.md) | App funcionando normalmente | App funcionando normalmente |
| 1 | [Excesso de chamadas](./docs/high-load.md) | App degrada, sem reação | HPA escala por CPU |
| 2 | [App trava](./docs/hang.md) | Container fica "running" mas não responde | Probes detectam e reiniciam |
| 3 | [Fila acumula](./docs/queue.md) | Workers não dão conta | KEDA escala workers por tamanho da fila |
| 4 | Busca lenta (SLA violado) | App saudável mas experiência degradada | HPA escala por métrica custom (latência p95) |

## Comandos

### Docker

| Comando | Descrição |
|---------|-----------|
| `npm run docker:start` | Sobe a app com Docker Compose |
| `npm run docker:stop` | Para os containers |

### Kubernetes

| Comando | Descrição |
|---------|-----------|
| `npm run k8s:start` | Inicia Minikube e deploya tudo |
| `npm run k8s:stop` | Para o Minikube |
| `npm run k8s:deploy` | Builda imagem e deploya no Minikube |
| `npm run k8s:pods` | Lista pods no cluster |
| `npm run k8s:logs -- app=<name>` | Logs de um pod |

### Tests

| Comando | Descrição |
|---------|-----------|
| `npm run test:happy-path` | Load test — 50 VUs por 2min |
| `npm run test:high-load` | Load test — rampa até 500 VUs por 2min |
| `npm run test:hang` | Load test — trava a app no segundo 60 |
| `npm run test:queue` | Load test — burst de pedidos na fila |

## Documentação

- [Arquitetura](./ARCHITECTURE.md)
- [Passos da Construção](./docs/steps.md)
