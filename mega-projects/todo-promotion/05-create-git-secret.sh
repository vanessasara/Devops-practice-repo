#!/bin/bash
set -euo pipefail

: "${GITHUB_USERNAME:?Set GITHUB_USERNAME before running this script}"
: "${GITHUB_PAT:?Set GITHUB_PAT before running this script}"

kubectl create secret generic kargo-git-creds \
  -n todo-promotion \
  --from-literal=repoURL=https://github.com/vanessasara/Devops-practice-repo.git \
  --from-literal=username=$GITHUB_USERNAME \
  --from-literal=password=$GITHUB_PAT \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl label secret kargo-git-creds \
  -n todo-promotion \
  kargo.akuity.io/cred-type=git \
  --overwrite

echo "Git secret created and labeled"
