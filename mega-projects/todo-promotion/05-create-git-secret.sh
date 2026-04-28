#!/bin/bash
# -----------------------------------------------
# EDIT THESE TWO VALUES BEFORE RUNNING
GITHUB_USERNAME="vanessasara"
GITHUB_PAT="your-github-pat-here"
# -----------------------------------------------

kubectl create secret generic kargo-git-creds \
  -n todo-promotion \
  --from-literal=type=git \
  --from-literal=url=https://github.com/vanessasara/Devops-practice-repo.git \
  --from-literal=username=$GITHUB_USERNAME \
  --from-literal=password=$GITHUB_PAT \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl label secret kargo-git-creds \
  -n todo-promotion \
  kargo.akuity.io/cred-type=git \
  --overwrite

echo "✅ Git secret created and labeled"
