# Kargo Docker Hub Credentials

Kargo is failing artifact discovery because Docker Hub is rate limiting unauthenticated registry requests:

```txt
TOOMANYREQUESTS: You have reached your unauthenticated pull rate limit
```

Create Docker Hub image credentials in the `todo-promotion` namespace so the `todo-warehouse` image subscriptions can authenticate when reading tags and manifests.

## Create the Secrets

Use a Docker Hub access token, not your account password.

```bash
export DOCKERHUB_USERNAME="your-dockerhub-username"
export DOCKERHUB_TOKEN="your-dockerhub-access-token"

bash ./06-create-dockerhub-secret.sh
```

The script creates one Kargo image credential secret for each subscribed image repository:

```txt
index.docker.io/venisasarah/todo-frontend
index.docker.io/venisasarah/todo-backend
```

Each secret is labeled with:

```txt
kargo.akuity.io/cred-type=image
```

## Refresh Kargo Discovery

After creating the secrets, wait for the next Warehouse interval or refresh the Warehouse from the Kargo UI/CLI. The current Warehouse interval is `5m0s`.

If the error continues, verify the secrets exist:

```bash
kubectl get secret -n todo-promotion -l kargo.akuity.io/cred-type=image
```

Then check the Warehouse status:

```bash
kubectl describe warehouse todo-warehouse -n todo-promotion
```

## Git Credentials

`05-create-git-secret.sh` now expects the GitHub token from environment variables:

```bash
export GITHUB_USERNAME="vanessasara"
export GITHUB_PAT="your-new-github-token"

bash ./05-create-git-secret.sh
```

Any GitHub token that was previously committed or shared should be revoked and replaced.
