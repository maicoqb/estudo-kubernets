# Estudo Kubernetes

Estudo de caso sobre Kubernetes usando uma e-store como exemplo. Começamos com Docker, simulando cenários reais de falha e limitações de orquestração. Depois introduzimos o Kubernetes e mostramos como ele resolve esses mesmos problemas automaticamente.

## Cenários

Mais informações nos arquivo específicos de cada cenário.

| # | Cenário | Problema (Docker) | Solução (Kubernetes) |
|---|---------|-------------------|---------------------|
| 0 | [Caminho Feliz](./docs/happy-path.md) | App funcionando normalmente | App funcionando normalmente |
| 1 | [Excesso de chamadas](./docs/high-load.md) | App degrada, sem reação | HPA escala por latência p95 |
| 2 | [App trava](./docs/hang.md) | Container fica "running" mas não responde | Probes detectam e reiniciam |
| 3 | Fila acumula | Workers não dão conta, pedidos atrasam | KEDA escala workers por tamanho da fila |

## Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run docker:start` | Sobe a app com Docker Compose |
| `npm run seed:products` | Popula o banco com 100 produtos |
| `npm run test:happy-path` | Load test — 50 VUs por 30s |
| `npm run test:high-load` | Load test — rampa até 500 VUs |
| `npm run minikube:start` | Inicia o cluster Kubernetes local |
| `npm run k8s:deploy` | Builda imagem e deploya no Minikube |
| `npm run k8s:pods` | Lista pods no cluster |

## Documentação

- [Arquitetura](./ARCHITECTURE.md)
- [Passos da Construção](./docs/steps.md)
