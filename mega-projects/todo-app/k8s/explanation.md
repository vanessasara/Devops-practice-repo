## Summary
This folder runs a **simple Next.js frontend on port 3000** and a **FastAPI backend on port 8000** with **no database** (in-memory todos).

## Why nginx was removed
- The repo previously had an nginx reverse-proxy setup (mainly for `docker-compose`) and I also briefly added an nginx proxy in Kubernetes to route `/api/*` to the backend.
- You requested **no nginx anywhere** and a **simple Next.js app on 3000**, so the Kubernetes nginx manifest was removed and the local nginx config was removed.

Important impact:
- The frontend code calls the API using `fetch("/api/todos")`.
- Without nginx, this now works because **Next.js rewrites** proxy `/api/*` to the backend Service inside the cluster.

## Kubernetes changes made
### Frontend
- **`frontend-service.yml`** now exposes **Service port 3000** and targets container port **3000**.
- **`frontend-deployment.yml`** already exposes container port **3000** and probes use **3000**.
- `HOSTNAME=0.0.0.0` remains set so the Next.js server binds to all interfaces (helps port-forward reliability).
 - **`frontend/next.config.ts`** adds a rewrite so `/api/*` proxies to `backend-service:8000`.

Port-forward example:

```bash
kubectl -n todo-app port-forward svc/frontend-service 3000:3000
```

### Backend
- **`backend-service.yml`** exposes port **8000**
- **MongoDB was removed**. Backend now stores todos in memory (data resets when the backend pod restarts).

### Data persistence note
- With MongoDB removed, **persistence is not provided**. If you want persistence without MongoDB later, the simplest option is switching the backend to SQLite and mounting a PVC.

## Docker Compose changes made
- Removed the `nginx` service from `todo-app/docker-compose.yml`
- Exposed frontend directly with `3000:3000`
- MongoDB is no longer required for the backend (in-memory storage).

## Files removed
- `todo-app/k8s/nginx.yml`
- `todo-app/nginx/nginx.conf`
 - `todo-app/k8s/mongodb.yml`

