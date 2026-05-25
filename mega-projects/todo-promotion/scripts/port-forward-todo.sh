#!/usr/bin/env bash
set -euo pipefail

NAMESPACE="${1:-todo-dev}"
FRONTEND_PORT="${FRONTEND_PORT:-3000}"
BACKEND_PORT="${BACKEND_PORT:-8000}"

cleanup() {
  if [[ -n "${FRONTEND_PID:-}" ]]; then
    kill "$FRONTEND_PID" 2>/dev/null || true
  fi
  if [[ -n "${BACKEND_PID:-}" ]]; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

echo "Starting todo port-forwards in namespace: ${NAMESPACE}"
echo "Frontend: http://localhost:${FRONTEND_PORT}"
echo "Backend direct health/API: http://localhost:${BACKEND_PORT}/api/todos"
echo
echo "Use the frontend URL in your browser. The frontend talks to the backend through /api."
echo

kubectl port-forward -n "$NAMESPACE" svc/todo-frontend "${FRONTEND_PORT}:3000" &
FRONTEND_PID=$!

kubectl port-forward -n "$NAMESPACE" svc/todo-backend "${BACKEND_PORT}:8000" &
BACKEND_PID=$!

sleep 2

echo "Checking frontend API proxy..."
curl -fsS "http://localhost:${FRONTEND_PORT}/api/todos" >/dev/null
echo "OK: frontend /api reaches the backend"

echo
echo "Port-forwards are running. Press Ctrl+C to stop."
wait
