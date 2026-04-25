# Kargo + ArgoCD — Todo App Pipeline
# vanessasara/Devops-practice-repo

## COMPLETE FOLDER STRUCTURE

### 1. Your GitHub repo should look like this AFTER setup:

```
Devops-practice-repo/
│
├── todo-app/
│   └── apps/                        ← your existing root-app path (UNTOUCHED)
│
└── envs/                            ← NEW: Kargo reads/writes these
    ├── dev/
    │   └── deployment.yaml
    ├── staging/
    │   └── deployment.yaml
    └── prod/
        └── deployment.yaml
```

### 2. These files you apply directly to your cluster (NOT pushed to GitHub):

```
kargo-todo/
├── namespaces.yaml
├── secrets/
│   └── github-creds-secret.yaml     ← fill in YOUR_GITHUB_PAT_TOKEN
├── argocd/
│   └── applications.yaml
└── kargo/
    └── pipeline.yaml
```

---

## STEP 1 — Push the envs/ folder to your GitHub repo

Copy the `envs/` folder from this zip into the ROOT of your GitHub repo:
`https://github.com/vanessasara/Devops-practice-repo`

```bash
# From your local clone of the repo:
cp -r envs/ ~/path/to/Devops-practice-repo/
cd ~/path/to/Devops-practice-repo
git add envs/
git commit -m "add kargo pipeline env manifests"
git push origin master
```

---

## STEP 2 — Fill in your PAT token

Open `secrets/github-creds-secret.yaml` and replace:
```
password: YOUR_GITHUB_PAT_TOKEN
```
with your actual GitHub Personal Access Token.

To create one: GitHub → Settings → Developer Settings → Personal Access Tokens → Fine-grained
Scopes needed: **Contents** (read + write) on `Devops-practice-repo`

---

## STEP 3 — Apply in this exact order

```bash
# 1. Namespaces first
kubectl apply -f namespaces.yaml

# 2. GitHub secret (file-based, no CLI command needed)
kubectl apply -f secrets/github-creds-secret.yaml

# 3. ArgoCD Applications for dev/staging/prod
kubectl apply -f argocd/applications.yaml

# 4. Kargo pipeline (Project + Warehouse + Stages)
kubectl apply -f kargo/pipeline.yaml
```

---

## STEP 4 — Verify

```bash
# ArgoCD apps should show as Synced
kubectl get applications -n argocd

# Kargo stages should show as Healthy
kubectl get stages -n kargo-demo

# Warehouse should be Ready
kubectl get warehouses -n kargo-demo

# Secret created
kubectl get secret github-creds -n kargo-demo
```

---

## HOW THE PIPELINE FLOWS

```
Docker Hub push (v1.0.2)
        ↓
  Kargo Warehouse detects new tag → creates Freight
        ↓
  [DEV Stage] — auto-promotes
    Kargo writes v1.0.2 into envs/dev/deployment.yaml → git push
    ArgoCD detects change → syncs todo-dev app → pods update
        ↓
  [STAGING Stage] — you click Promote in Kargo UI
    Same process for envs/staging/deployment.yaml
        ↓
  [PROD Stage] — manual approval required
    You approve in Kargo UI → envs/prod/deployment.yaml updated
    ArgoCD syncs todo-prod → done ✅
```

---

## YOUR EXISTING root-app IS NOT AFFECTED

Your `root-app` ArgoCD Application watches `todo-app/apps/` path.
The new ArgoCD apps (`todo-dev`, `todo-staging`, `todo-prod`) watch `envs/` path.
These are completely separate — no conflicts.

---

## DEMO SCRIPT (what to show)

1. Open Kargo UI: `kubectl port-forward svc/kargo-api -n kargo 8080:80`
2. Show the pipeline: Warehouse → dev → staging → prod
3. Retag and push a new image to Docker Hub:
   ```bash
   docker pull venisasarah/todo-frontend:v1.0.1
   docker tag venisasarah/todo-frontend:v1.0.1 venisasarah/todo-frontend:v1.0.2
   docker push venisasarah/todo-frontend:v1.0.2
   ```
4. Watch Freight appear in the Warehouse automatically
5. Watch dev auto-promote and ArgoCD sync
6. Click Promote to staging → show git commit Kargo made
7. Click Promote to prod → show approval gate
8. Open ArgoCD UI alongside: `kubectl port-forward svc/argocd-server -n argocd 8081:443`
