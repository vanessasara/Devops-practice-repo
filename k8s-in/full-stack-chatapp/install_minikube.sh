#!/bin/bash

echo "🚀 Starting installation of Docker, Minikube, and kubectl..."
sudo apt update -y
sudo apt install -y curl wget apt-transport-https gnupg lsb-release

# ----------------------------
# 1. Install Docker
# ----------------------------
if ! command -v docker &>/dev/null; then
  echo "📦 Installing Docker..."
  sudo apt install -y docker.io

  echo "👤 Adding current user to docker group..."
  sudo usermod -aG docker "$USER"
  echo "⚠️ You may need to log out and back in for Docker group changes to take effect."

  echo "✅ Docker installed and user added to docker group."
else
  echo "✅ Docker is already installed."
fi

# ----------------------------
# 2. Install Minikube
# ----------------------------
if ! command -v minikube &>/dev/null; then
  echo "📦 Installing Minikube..."

  ARCH=$(uname -m)
  case "$ARCH" in
    x86_64)
      curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
      sudo install minikube-linux-amd64 /usr/local/bin/minikube
      rm minikube-linux-amd64
      ;;
    aarch64)
      curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-arm64
      sudo install minikube-linux-arm64 /usr/local/bin/minikube
      rm minikube-linux-arm64
      ;;
    *)
      echo "❌ Unsupported architecture: $ARCH"
      exit 1
      ;;
  esac

  echo "✅ Minikube installed successfully."
else
  echo "✅ Minikube is already installed."
fi

# ----------------------------
# 3. Install kubectl
# ----------------------------
if ! command -v kubectl &>/dev/null; then
  echo "📦 Installing kubectl (latest stable version)..."

  ARCH=$(uname -m)
  if [ "$ARCH" = "aarch64" ]; then
    KUBE_ARCH="arm64"
  else
    KUBE_ARCH="amd64"
  fi

  curl -LO "https://dl.k8s.io/release/$(curl -Ls https://dl.k8s.io/release/stable.txt)/bin/linux/${KUBE_ARCH}/kubectl"
  sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
  rm -f kubectl

  echo "✅ kubectl installed successfully."
else
  echo "✅ kubectl is already installed."
fi

# ----------------------------
# 4. Start Minikube
# ----------------------------
echo "🚀 Starting Minikube with Docker driver..."
minikube start --driver=docker
minikube status
