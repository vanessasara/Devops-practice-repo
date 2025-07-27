# README\_PROJECTS.md

This document describes the various Kubernetes projects under `k8s-in` and the primary commands used for each.

## Namespace Setup

* **File**: `namespace.yml`
* **Commands**:

  ```bash
  kubectl apply -f namespace.yml
  kubectl get ns
  ```

## Deployment & Service (Notes App)

* **Files**: `deployment.yml`, `service.yml`
* **Commands**:

  ```bash
  kubectl apply -f deployment.yml -n notes-app
  kubectl apply -f service.yml -n notes-app
  kubectl get pods -n notes-app
  kubectl describe pod <pod-name> -n notes-app
  ```

## Ingress (Notes App)

* **File**: `ingress.yml`
* **Commands**:

  ```bash
  kubectl apply -f ingress.yml -n notes-app
  kubectl get ingress -n notes-app
  kubectl describe ingress notes-app -n notes-app
  ```

## NGINX Demo

* **Files**: `deployment.yml`, `service.yml`, `pod.yml`
* **Commands**:

  ```bash
  kubectl apply -f namespace.yml -n nginx
  kubectl apply -f pod.yml -n nginx
  kubectl apply -f deployment.yml -n nginx
  kubectl scale deployment nginx-deployment --replicas=2 -n nginx
  kubectl get pods -n nginx
  ```

## Jobs & CronJobs

* **Files**: `job.yml`, `cronjob.yml`
* **Commands**:

  ```bash
  kubectl apply -f job.yml -n nginx
  kubectl delete job nginx-job -n nginx
  kubectl apply -f cronjob.yml -n nginx
  kubectl delete -f cronjob.yml -n nginx
  ```

## StatefulSets (MySQL Demo)

* **Files**: `statefulsets.yml`, `persistentVolume.yml`, `persistentVolumeClaim.yml`, `configmaps.yml`, `secrets.yml`
* **Commands**:

  ```bash
  kubectl apply -f persistentVolume.yml -n mysql
  kubectl apply -f persistentVolumeClaim.yml -n mysql
  kubectl apply -f configmaps.yml -n mysql
  kubectl apply -f secrets.yml -n mysql
  kubectl apply -f statefulsets.yml -n mysql
  kubectl get pods -n mysql
  kubectl exec -it mysql-statefulset-0 -n mysql -- bash
  ```

## Metrics Server Installation

* **Commands**:

  ```bash
  kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
  kubectl -n kube-system rollout restart deployment metrics-server
  kubectl top nodes
  kubectl top pods -n nginx
  ```

---

*For more details, refer to the manifests and adjust namespace flags (**\`\`**) as needed.*
