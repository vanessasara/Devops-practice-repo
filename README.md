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

🎉 CONGRATS!! you're ready to go
