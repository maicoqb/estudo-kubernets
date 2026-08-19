# Cenário 4 — Carrinhos Abertos (Métrica Custom)

Muitos carrinhos abertos indicam pico de compras iminente. Docker não reage.

## Load Test

```bash
npm run test:open-carts
```

## O problema (Docker)

Carrinhos acumulam, orders degrada. Docker não sabe que a demanda está crescendo.

- Carrinhos abertos passam de 100
- Tempo de resposta do order aumenta
- Sem escala, pedidos falham ou atrasam

![open-carts-docker-dashboard](open-carts-docker-dashboard.png)

## Solução (Kubernetes)

HPA monitora a métrica `open_carts` do carts-service e escala o orders-service proativamente.

- `open_carts` > 100 por pod → HPA adiciona pods
- Mais pods = mais capacidade para absorver o checkout
- Carrinhos reduzem → após 60s de cooldown, pods extras são removidos

![open-carts-docker-dashboard](open-carts-docker-dashboard.png)
