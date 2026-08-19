#!/bin/bash
set -e

if ! command -v minikube &> /dev/null; then
  echo "==> Baixando Minikube..."
  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

  echo "==> Instalando Minikube em /usr/local/bin..."
  sudo install minikube-linux-amd64 /usr/local/bin/minikube
  rm minikube-linux-amd64
fi

echo "==> Verificando instalação..."
minikube version

echo ""
echo "✔ Minikube pronto!"
echo "  Para iniciar: npm run minikube:start"
