# Todo Port-Forwarding

The todo frontend is a Next.js app. Its Kubernetes build has this rewrite:

```txt
/api/:path* -> http://backend-service:8000/api/:path*
```

That means the browser should open the frontend and the frontend should call relative `/api/...` URLs. Do not use `http://backend-service:8000` in your browser; that DNS name only exists inside Kubernetes.

## Recommended

Run:

```bash
./scripts/port-forward-todo.sh todo-dev
```

Then open:

```txt
http://localhost:3000
```

The script also checks:

```txt
http://localhost:3000/api/todos
```

If that endpoint returns data, the frontend-to-backend path is working.

## Manual Commands

Use two terminals:

```bash
kubectl port-forward -n todo-dev svc/todo-frontend 3000:3000
```

```bash
kubectl port-forward -n todo-dev svc/todo-backend 8000:8000
```

Open the app at `http://localhost:3000`.

The direct backend URL `http://localhost:8000/api/todos` is only for backend testing. The frontend should use `/api/todos`, which is proxied by the Next.js server to the Kubernetes backend service.
