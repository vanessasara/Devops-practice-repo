# Todo App — Kargo + ArgoCD Promotion Pipeline

## What this does

Every time your GitHub Actions workflow pushes a new image tag to DockerHub
(e.g. `venisasarah/todo-frontend:v1.0.3`), Kargo detects it automatically
and creates a **Freight** (a bundle containing both the frontend + backend tags).

You then promote that Freight through:

```
DockerHub (new tag pushed by GitHub Actions)
        ↓
   Kargo Warehouse discovers it → Freight created
        ↓
   Promote to DEV  (manual or auto)
   Kargo edits dev/frontend-deployment.yaml + dev/backend-deployment.yaml
   → git push → ArgoCD syncs todo-dev namespace
        ↓
   Promote to STAGING  (manual)
   Same process for staging/
        ↓
   Promote to PROD  (manual, gated)
   Same process for prod/
```

---

## Step 1 — Copy deployment files to your repo

Copy the `dev/`, `staging/`, and `prod/` folders into your repo at:
```
mega-projects/todo-promotion/
├── dev/
│   ├── frontend-deployment.yaml
│   └── backend-deployment.yaml
├── staging/
│   ├── frontend-deployment.yaml
│   └── backend-deployment.yaml
└── prod/
    ├── frontend-deployment.yaml
    └── backend-deployment.yaml
```

Then push:
```bash
git add mega-projects/todo-promotion/
git commit -m "add todo promotion manifests"
git push origin main
```

---

## Step 2 — Apply everything to the cluster

Run these commands **in order**:

```bash
# 1. Create namespaces
kubectl apply -f 00-namespaces.yaml

# 2. Create ArgoCD applications
kubectl apply -f 01-argocd-apps.yaml

# 3. Create Kargo project (namespace for Kargo resources)
kubectl apply -f 02-kargo-project.yaml

# 4. Create Kargo warehouse (watches DockerHub for new tags)
kubectl apply -f 03-kargo-warehouse.yaml

# 5. Create Kargo stages (dev → staging → prod pipeline)
kubectl apply -f 04-kargo-stages.yaml

# 6. Give Kargo push access to your GitHub repo
#    Edit 05-create-git-secret.sh first — paste your GitHub PAT
bash 05-create-git-secret.sh
```

---

## Step 3 — Trigger the pipeline

### Option A — Push a new image via GitHub Actions
Bump the version in `dockerhub-images.yml` (e.g. `v1.0.3`), commit and run the
workflow. Kargo polls DockerHub every 5 minutes and will detect the new tag.

### Option B — Promote the existing tags now (for testing)
```bash
# Check what freight is available
kubectl get freight -n todo-promotion

# Promote to dev
kargo promote --project todo-promotion --freight <freight-name> --stage dev

# After dev is green, promote to staging
kargo promote --project todo-promotion --freight <freight-name> --stage staging

# After staging is green, promote to prod
kargo promote --project todo-promotion --freight <freight-name> --stage prod
```

Or click **Promote** in the Kargo UI at https://localhost:3000

---

## Watching it work

| UI | URL | Credentials |
|---|---|---|
| Kargo | https://localhost:3000 | admin / your values.yaml password |
| ArgoCD | https://localhost:8080 | admin / from argocd-initial-admin-secret |

In ArgoCD you'll see `todo-dev`, `todo-staging`, `todo-prod` apps syncing
automatically after each Kargo promotion commits the updated image tag.

---

## How auto-detection works

Your GitHub Actions file pushes two tags per image:
- `venisasarah/todo-frontend:latest`
- `venisasarah/todo-frontend:v1.0.2`

The Kargo Warehouse ignores `:latest` (tagFormat regex `^v\d+\.\d+\.\d+$` only
matches versioned tags) and picks up only the `v1.0.x` tags. This means every
new version you push automatically creates a new Freight in Kargo — **no manual
intervention needed** to detect it.
