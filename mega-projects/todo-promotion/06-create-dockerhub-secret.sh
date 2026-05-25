#!/bin/bash
set -euo pipefail

: "${DOCKERHUB_USERNAME:?Set DOCKERHUB_USERNAME before running this script}"
: "${DOCKERHUB_TOKEN:?Set DOCKERHUB_TOKEN before running this script}"

for repo in todo-frontend todo-backend; do
  kubectl create secret generic "kargo-dockerhub-${repo}" \
    -n todo-promotion \
    --from-literal=repoURL="index.docker.io/venisasarah/${repo}" \
    --from-literal=username="$DOCKERHUB_USERNAME" \
    --from-literal=password="$DOCKERHUB_TOKEN" \
    --dry-run=client -o yaml | kubectl apply -f -

  kubectl label secret "kargo-dockerhub-${repo}" \
    -n todo-promotion \
    kargo.akuity.io/cred-type=image \
    --overwrite
done

echo "Docker Hub image credentials created and labeled"
