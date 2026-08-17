# Estudo Kubernetes

Estudo de caso sobre Kubernetes usando uma e-store como exemplo. Começamos com Docker, simulando cenários reais de falha e limitações de orquestração. Depois introduzimos o Kubernetes e mostramos como ele resolve esses mesmos problemas automaticamente.

## Cenários

Mais informações nos arquivo específicos de cada cenário.

| # | Cenário | Problema (Docker) | Solução (Kubernetes) |
|---|---------|-------------------|---------------------|
| 0 | [Caminho Feliz](./docs/happy-path.md) | App funcionando normalmente | App funcionando normalmente |
| 1 | [Excesso de chamadas](./docs/high-load.md) | App degrada, sem reação | HPA escala por CPU |
| 2 | App morre/trava | Container fica unhealthy, sem recuperação | Probes detectam e reiniciam |
| 3 | Fila acumula | Workers não dão conta, pedidos atrasam | KEDA escala workers por tamanho da fila |
| 4 | Busca lenta (SLA violado) | App saudável mas experiência degradada | HPA escala por métrica custom de negócio |

## Documentação

- [Arquitetura](./ARCHITECTURE.md)
- [Passos da Construção](./docs/steps.md)
