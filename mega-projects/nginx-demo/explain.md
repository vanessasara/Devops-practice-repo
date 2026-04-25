# Kargo + ArgoCD Setup — Errors, Fixes & Lessons Learned

---

## Error 1 — Kargo Project namespace conflict

### What happened
```
admission webhook "project.kargo.akuity.io" denied the request:
failed to initialize Project "my-app" because namespace "my-app" 
already exists and is not labeled as a Project namespace
```

### Why
A namespace called `my-app` already existed in the cluster from a previous session. Kargo requires the namespace to be **created by Kargo itself** — it adds special labels when it creates it. A manually created namespace doesn't have those labels.

### Fix
```bash
kubectl delete namespace my-app
kubectl apply -f project.yaml
```

Always let Kargo create the namespace via the Project resource. Never create it manually.

---

## Error 2 — ArgoCD not installed

### What happened
```
No resources found in argocd namespace
kubectl get pods -n argocd → No resources found
```

### Why
ArgoCD was never installed on the cluster.

### Fix
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl get pods -n argocd -w   # wait for all pods Running
```

---

## Error 3 — Wrong folder name and typo in path

### What happened
ArgoCD apps showed `OutOfSync / Missing` — apps couldn't find the manifests.

### Why
- Folder was named `sony-interior-shop` but ArgoCD was looking for `sony-interior-app`
- Staging folder was named `stagging` (double g typo)

### Fix
```bash
mv sony-interior-shop sony-interior-app
mv sony-interior-app/stagging sony-interior-app/staging

git add .
git commit -m "fix: rename folders to match argocd paths"
git push origin master
```

### Lesson
Always verify folder names match exactly what's in your ArgoCD `path:` field.

---

## Error 4 — Wrong Git branch (HEAD vs master)

### What happened
ArgoCD apps were `OutOfSync` — couldn't find manifests even after fixing folder names.

### Why
ArgoCD was configured with `targetRevision: HEAD` but the code was on `master` branch not `main`.

### Fix
Update `argocd-apps.yaml`:
```yaml
targetRevision: master
```

```bash
kubectl apply -f argocd-apps.yaml
```

---

## Error 5 — ImagePullBackOff (containerd network timeout)

### What happened
```
Failed to pull image "nginxdemos/hello:latest": 
dial tcp 104.16.101.215:443: i/o timeout
```

### Why
The cluster's container runtime (containerd) couldn't reach Docker Hub's CDN (`production.cloudflare.docker.com`). This is a network/firewall issue specific to containerd, not Docker itself.

### Fix
Add a Docker Hub mirror to k3s:
```bash
sudo nano /etc/rancher/k3s/registries.yaml
```

```yaml
mirrors:
  docker.io:
    endpoint:
      - "https://mirror.gcr.io"
      - "https://registry-1.docker.io"
```

```bash
sudo systemctl restart k3s
```

---

## Error 6 — Kargo Warehouse Docker Hub timeout

### What happened
```
error discovering newest applicable images "docker.io/nginxdemos/hello":
dial tcp 104.16.100.215:443: i/o timeout
```

### Why
Kargo's controller also couldn't reach Docker Hub CDN to discover image tags — same network issue as above but affects Kargo separately from containerd.

### Fix
Switch to GitHub Container Registry (ghcr.io) which is not blocked:

```bash
sed -i 's|docker.io/nginxdemos/hello|ghcr.io/nginxinc/nginx-unprivileged|g' \
  mega-projects/nginx-demo/kargo/warehouse.yaml

kubectl delete warehouse nginx-demo-warehouse -n my-app
kubectl apply -f mega-projects/nginx-demo/kargo/warehouse.yaml
```

---

## Error 7 — Kargo Warehouse Docker Hub rate limit

### What happened
```
GET https://index.docker.io/v2/nginxdemos/hello/manifests/plain-text: 
TOOMANYREQUESTS: You have reached your unauthenticated pull rate limit.
```

### Why
Too many unauthenticated requests to Docker Hub hit the rate limit (100 pulls/6 hours for unauthenticated users).

### Fix
Same as Error 6 — switch to `ghcr.io` image which has no rate limits.

---

## Error 8 — kubectl edit didn't save warehouse change

### What happened
After running `kubectl edit warehouse` and changing the repoURL, Kargo was still using the old Docker Hub image.

### Why
The `kubectl edit` command saved but the warehouse yaml file in the Git repo was never updated — so when the warehouse was deleted and reapplied it reverted back.

### Fix
Always update the source yaml file AND reapply:
```bash
sed -i 's|docker.io/nginxdemos/hello|ghcr.io/nginxinc/nginx-unprivileged|g' \
  mega-projects/nginx-demo/kargo/warehouse.yaml

git add .
git commit -m "fix: update warehouse to use ghcr image"
git push origin master

kubectl delete warehouse nginx-demo-warehouse -n my-app
kubectl apply -f mega-projects/nginx-demo/kargo/warehouse.yaml
```

---

## Error 9 — Kargo UI password unknown

### What happened
Couldn't log into Kargo UI — password was forgotten.

### Why
The bcrypt hash stored in the secret can't be reversed back to the original password.

### Fix
Generate a new bcrypt hash and patch the secret:
```bash
# generate hash
htpasswd -bnBC 10 "" admin123 | tr -d ':\n'

# patch secret
kubectl patch secret kargo-api -n kargo \
  --type='json' \
  -p='[{"op":"replace","path":"/data/ADMIN_ACCOUNT_PASSWORD_HASH","value":"'$(echo -n '<your-hash-here>' | base64 -w 0)'"}]'

# restart api
kubectl rollout restart deployment kargo-api -n kargo
```

Login with `admin` / `admin123`.

---

## Error 10 — Helm repo unreachable

### What happened
```
Error: looks like "https://charts.kargo.io" is not a valid chart repository:
dial tcp: lookup charts.kargo.io: no such host
```

### Why
DNS on the machine was blocking `charts.kargo.io`. This made `helm upgrade` impossible.

### Fix
Patch the Kubernetes secret directly instead of using helm upgrade (see Error 9 fix above).

---

## Correct Apply Order (reference)

```bash
# 1. namespaces
kubectl create namespace nginx-dev
kubectl create namespace nginx-staging
kubectl create namespace nginx-prod

# 2. kargo — project FIRST, then warehouse, then stages
kubectl apply -f mega-projects/nginx-demo/kargo/project.yaml
kubectl apply -f mega-projects/nginx-demo/kargo/warehouse.yaml
kubectl apply -f mega-projects/nginx-demo/kargo/stage-dev.yaml
kubectl apply -f mega-projects/nginx-demo/kargo/stage-staging.yaml
kubectl apply -f mega-projects/nginx-demo/kargo/stage-prod.yaml

# 3. argocd apps
kubectl apply -f mega-projects/nginx-demo/argocd/dev-app.yaml
kubectl apply -f mega-projects/nginx-demo/argocd/staging-app.yaml
kubectl apply -f mega-projects/nginx-demo/argocd/prod-app.yaml
```

---

## Nuke Command (full reset)

```bash
kubectl delete application nginx-demo-dev nginx-demo-staging nginx-demo-prod -n argocd
kubectl delete stage dev staging prod -n my-app
kubectl delete warehouse nginx-demo-warehouse -n my-app
kubectl delete project my-app
kubectl delete namespace nginx-dev nginx-staging nginx-prod my-app
```

---

## Useful Debug Commands

```bash
# check all kargo resources
kubectl get project,warehouse,stages,freight -n my-app

# check argocd apps
kubectl get applications -n argocd

# check pods in each env
kubectl get pods -n nginx-dev
kubectl get pods -n nginx-staging
kubectl get pods -n nginx-prod

# kargo controller logs
kubectl logs -n kargo -l app.kubernetes.io/component=controller --tail=20

# describe a failing pod
kubectl describe pod <pod-name> -n <namespace>

# port forward kargo ui
kubectl port-forward svc/kargo-api -n kargo 31081:443

# port forward argocd ui
kubectl port-forward svc/argocd-server -n argocd 8080:443
```
