#!/bin/bash
set -e

#################################
###  Apontando para o Docker  ###
###       do Minikube         ###
#################################
echo "==> Configurando Docker para buildar no Minikube..."
eval $(minikube docker-env)

#################################
###     Build das Imagens     ###
#################################
echo "==> Buildando imagem do products-service..."
docker build -f apps/products-service/Dockerfile -t products-service:latest .

echo "==> Buildando imagem do seed..."
docker build -f seeds/Dockerfile -t seed-products:latest seeds/


#################################
###  Aplicando os Deployments ###
#################################
echo "==> Aplicando manifests..."
minikube kubectl -- apply -f infra/k8s/namespace.yaml

echo "==> Criando ConfigMaps a partir dos arquivos..."
minikube kubectl -- create configmap prometheus-config \
  --from-file=prometheus.yml=infra/prometheus/prometheus.yml \
  -n estore --dry-run=client -o yaml | minikube kubectl -- apply -f -

minikube kubectl -- create configmap grafana-datasources \
  --from-file=datasources.yml=infra/grafana/datasources.yml \
  -n estore --dry-run=client -o yaml | minikube kubectl -- apply -f -

minikube kubectl -- create configmap grafana-dashboards-provider \
  --from-file=dashboards.yml=infra/grafana/dashboards.yml \
  -n estore --dry-run=client -o yaml | minikube kubectl -- apply -f -

minikube kubectl -- create configmap grafana-dashboards-json \
  --from-file=infra/grafana/dashboards/products-service.json \
  -n estore --dry-run=client -o yaml | minikube kubectl -- apply -f -

minikube kubectl -- apply -f infra/k8s/postgres.yaml
minikube kubectl -- apply -f infra/k8s/prometheus.yaml
minikube kubectl -- apply -f infra/k8s/grafana.yaml
minikube kubectl -- apply -f infra/k8s/products-service.yaml

echo "==> Rodando seed..."
minikube kubectl -- delete job seed-products -n estore --ignore-not-found
minikube kubectl -- apply -f infra/k8s/seed-job.yaml


#################################
###      Tunnel e Grafana     ###
#################################
echo "==> Aguardando pods ficarem prontos..."
minikube kubectl -- wait --for=condition=Ready pod -l app=products-service -n estore --timeout=300s
minikube kubectl -- wait --for=condition=Ready pod -l app=grafana -n estore --timeout=300s

echo "==> Iniciando tunnel e port-forward..."
pkill -f "minikube tunnel" 2>/dev/null || true
pkill -f "port-forward.*grafana" 2>/dev/null || true
minikube tunnel > /dev/null 2>&1 &
minikube kubectl -- port-forward -n estore svc/grafana 3001:3000 > /dev/null 2>&1 &


#################################
###    Finalizando Script     ###
#################################
echo "==> Limpando imagens antigas..."
docker image prune -f

echo "==> Pods:"
minikube kubectl -- get pods -n estore

echo ""
echo "✔ Deploy concluído!"
echo "  App: http://localhost:3000/api/products"
echo "  Grafana: http://localhost:3001 (admin/admin)"
