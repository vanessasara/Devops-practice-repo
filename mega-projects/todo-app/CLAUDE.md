# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A full-stack todo application used for DevOps practice, with multiple deployment options:
- **Backend**: FastAPI (Python 3.12) with in-memory storage
- **Frontend**: Next.js 16 + React 19 + Tailwind CSS v4

## Development Commands

### Backend (from `backend/`)
```bash
uv sync                    # Install dependencies
uv run uvicorn main:app --reload --port 8000   # Development server
```

### Frontend (from `frontend/`)
```bash
pnpm install               # Install dependencies
pnpm dev                   # Development server (port 3000)
pnpm build                 # Production build
pnpm start                 # Production server
pnpm lint                  # Run ESLint
```

### Docker Compose (from root)
```bash
docker compose up --build  # Build and run both services
docker compose down        # Stop services
```

### Kubernetes (from root)
```bash
kind create cluster --config k8s/kind-config.yml   # Create Kind cluster
kubectl apply -f k8s/namespace.yml                  # Create namespace first
kubectl apply -f k8s/                               # Deploy all resources
kubectl -n todo-app port-forward svc/frontend-service 3000:3000  # Access locally
```

### Terraform (AWS deployment)
```bash
terraform init
terraform apply -var="key_name=your-ssh-key"  # Deploy to AWS EC2
```

## Architecture

```
todo-app/
├── backend/                 # FastAPI Python backend
│   ├── main.py             # Single-file API with CRUD endpoints
│   ├── pyproject.toml      # uv/pip dependencies
│   └── Dockerfile          # Multi-stage build with uv
├── frontend/               # Next.js frontend
│   ├── components/TodoApp.tsx  # Main UI component
│   ├── api.ts              # Axios instance for API calls
│   ├── app/                # Next.js App Router pages
│   └── Dockerfile          # Production build with pnpm
├── k8s/                    # Kubernetes manifests
│   ├── namespace.yml       # todo-app namespace
│   ├── backend-deployment.yml
│   ├── backend-service.yml
│   ├── frontend-deployment.yml
│   ├── frontend-service.yml
│   └── kind-config.yml     # Kind cluster config
├── docker-compose.yml      # Local development setup
└── iac-todo-app.tf         # Terraform for AWS EC2 deployment
```

## Key Details

### Backend API Endpoints
- `GET /api/todos` - List all todos
- `POST /api/todos` - Create todo
- `PATCH /api/todos/{id}` - Update todo
- `DELETE /api/todos/{id}` - Delete todo

### Data Storage
- Backend uses **in-memory storage** (Python dict). Data is lost when the backend restarts.
- No database configuration needed.

### Frontend API Configuration
- The frontend uses axios with a base instance (`api.ts`)
- For Kubernetes, API requests to `/api/*` are handled by Next.js rewrites that proxy to the backend service
- For Docker Compose, the backend is reached via `http://backend:8000` (container networking)

### Deployment Images
- Kubernetes deployments reference Docker Hub images: `venisasarah/todo-backend:v1.0.2` and `venisasarah/todo-frontend:v1.0.5`
- Update image tags in `k8s/*-deployment.yml` files when pushing new versions

### Next.js Version
This project uses Next.js 15.3.x with React 18, a stable and secure version.