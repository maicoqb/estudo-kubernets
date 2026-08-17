#!/bin/bash
set -e

if command -v minikube &> /dev/null; then
  echo "Minikube já está instalado:"
  minikube version
  exit 0
fi

echo "==> Baixando Minikube..."
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

echo "==> Instalando Minikube em /usr/local/bin..."
sudo install minikube-linux-amd64 /usr/local/bin/minikube
rm minikube-linux-amd64

echo "==> Verificando instalação..."
minikube version

echo ""
echo "✔ Minikube instalado com sucesso!"
echo ""
echo "Para iniciar o cluster:"
echo "  minikube start --driver=docker"
