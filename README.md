## Kubernetes KIND Cluster Setup

This guide walks you through installing and configuring a local Kubernetes cluster using [kind](https://kind.sigs.k8s.io/) (Kubernetes IN Docker).

---
Clone the repo:

```bash
git clone https://github.com/vanessasara/kubernetes-practice.git
cd k8s-in
```

## 1. Auto Dependencies Installation
Just run this file this make sure that your setup is ready to go with Docker, kind cluster and kubectl.
Don't worry if docker is not installed it will install automatically.

```bash
# Install kubectl (Linux amd64)
./install.sh
```

Verify:

```bash
kubectl version --client --output=yaml
kind version
```

---

## 2. Create a KIND Cluster

Use a minimal single-node cluster or a multi-node config.

### Single-node (control-plane only)

```bash
kind create cluster --name demo
```

### Multi-node (1 control-plane + 2 workers)

Create or just run `kind-config.yaml`:

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    image: kindest/node:v1.33.1
  - role: worker
    image: kindest/node:v1.33.1
  - role: worker
    image: kindest/node:v1.33.1
```

Then:

```bash
kind create cluster --config kind-config.yml --name k8s-cluster
```

---

## 3. Verify Cluster

```bash
kubectl cluster-info --context kind-k8s-cluster
kubectl get nodes
```

Expected:

```
NAME                       STATUS   ROLES           AGE   VERSION
k8s-cluster-control-plane  Ready    control-plane   1m    v1.33.1
k8s-cluster-worker         Ready    <none>          1m    v1.33.1
k8s-cluster-worker2        Ready    <none>          1m    v1.33.1
```

---

🎉 CONGRATS!! you're ready to go with Kind cluster 


---

# 🧭 Minikube Installation Guide for Ubuntu

This guide provides step-by-step instructions for installing **Minikube** on **Ubuntu**.
Minikube allows you to run a **single-node Kubernetes cluster locally** for development and testing purposes.

---

## 🧰 Pre-requisites

Ensure the following before proceeding:

* **Ubuntu OS**
* **sudo privileges**
* **Internet access**
* **Virtualization support enabled**
  Check with:

  ```bash
  egrep -c '(vmx|svm)' /proc/cpuinfo
  ```

  * `0` = disabled
  * `1` = enabled

---

## ⚙️ Step 1: Update System Packages

Update your package lists to make sure you are getting the latest version and dependencies.

```bash
sudo apt update
```

---

## 📦 Step 2: Install Required Packages

Install some basic required packages.

```bash
sudo apt install -y curl wget apt-transport-https
```

---

## 🐳 Step 3: Install Docker

Minikube can run a Kubernetes cluster either in a VM or locally via Docker.
This guide demonstrates the **Docker method**.

```bash
sudo apt install -y docker.io
```

Start and enable Docker.

```bash
sudo systemctl enable --now docker
```

Add current user to docker group (to use docker without root):

```bash
sudo usermod -aG docker $USER && newgrp docker
```

Now, logout (use `exit` command) and connect again.

---

## 🚀 Step 4: Install Minikube

First, download the Minikube binary using curl:

```bash
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
```

Make it executable and move it into your path:

```bash
chmod +x minikube
sudo mv minikube /usr/local/bin/
```

---

## 🧩 Step 5: Install kubectl

Download kubectl, which is a Kubernetes command-line tool.

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

Make it executable and move it into your path:

```bash
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
```

---

## 🏗️ Step 6: Start Minikube

Now, you can start Minikube with the following command:

```bash
minikube start --driver=docker --vm=true
```

This command will start a single-node Kubernetes cluster inside a Docker container.

---

## 🔍 Step 7: Check Cluster Status

Check the cluster status with:

```bash
minikube status
```

You can also use kubectl to interact with your cluster:

```bash
kubectl get nodes
```

---

## 🛑 Step 8: Stop Minikube

When you are done, you can stop the Minikube cluster with:

```bash
minikube stop
```

---

## 🧹 Optional: Delete Minikube Cluster

If you wish to delete the Minikube cluster entirely, you can do so with:

```bash
minikube delete
```

---

## 🎉 Conclusion

That’s it! You’ve successfully installed **Minikube** on **Ubuntu**, and you can now start deploying Kubernetes applications for **development** and **testing**.

---

