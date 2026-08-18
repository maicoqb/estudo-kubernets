# Cenário 2 — App Trava (Hang)

App trava sem crashar. Container fica "running" mas não responde.

## Load Test

```bash
npm run test:hang
```

Script: `load-tests/hang.js` — 50 VUs por 2min, dispara hang no segundo 60.

## O problema (Docker)

O Docker vê o container como "running" (processo não morreu). Não detecta o problema. A app fica morta-viva indefinidamente.

- Pod/container para de responder (Prometheus não consegue coletar métricas)
- Metrics para de atualizar após o hang

![hang-docker-dashboard](hang-docker-dashboard.png)
