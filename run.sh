#!/usr/bin/env bash
set -e

NAMESPACE_FILE="namespace.yaml"

echo "Starting deployment..."

echo "Applying namespace..."
kubectl apply -f $NAMESPACE_FILE

echo "Deploying PostgreSQL..."
kubectl apply -f postgres/postgres-secrets.yaml
kubectl apply -f postgres/postgres-config.yaml
kubectl apply -f postgres/postgres-pvc.yaml
kubectl apply -f postgres/postgres-service.yaml
kubectl apply -f postgres/postgres-stateful.yaml

echo "Deploying Redis..."
kubectl apply -f redis/redis-service.yaml
kubectl apply -f redis/redis-deployment.yaml
kubectl apply -f redis/redis-network.yaml

echo "Deploying Backend..."
kubectl apply -f backend/backend-secrets.yaml
kubectl apply -f backend/backend-configmap.yaml
kubectl apply -f backend/backend-service.yaml
kubectl apply -f backend/backend-deployment.yaml
kubectl apply -f backend/backend-hpa.yaml
kubectl apply -f backend/backend-network.yaml

echo "Deploying Frontend..."
kubectl apply -f frontend/frontend-service.yaml
kubectl apply -f frontend/frontend-deployment.yaml

echo "Applying network policies..."
kubectl apply -f network.yaml
kubectl apply -f postgres/postgres-network.yaml
kubectl apply -f redis/redis-network.yaml
kubectl apply -f backend/backend-network.yaml

echo "Applying ingress..."
kubectl apply -f ingress.yaml

echo "Deployment finished!"

echo "Cluster status:"
kubectl get pods -n movie-rater