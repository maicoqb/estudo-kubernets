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
minikube kubectl -- apply -f infra/k8s/postgres.yaml
minikube kubectl -- apply -f infra/k8s/products-service.yaml

echo "==> Rodando seed..."
minikube kubectl -- delete job seed-products -n estore --ignore-not-found
minikube kubectl -- apply -f infra/k8s/seed-job.yaml


#################################
###    Fazendo Port-Forward   ###
#################################
echo "==> Iniciando port-forward..."
pkill -f "port-forward.*products-service" 2>/dev/null || true
minikube kubectl -- port-forward -n estore svc/products-service 3000:3000 > /dev/null 2>&1 &


#################################
###    Finalizando Script     ###
#################################
echo "==> Limpando imagens antigas..."
docker image prune -f

echo "==> Pods:"
minikube kubectl -- get pods -n estore

echo ""
echo "✔ Deploy concluído!"
echo "  App disponível em: http://localhost:3000/api/products"
