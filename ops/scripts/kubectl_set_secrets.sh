#!/bin/bash

# staging/prod
DP_ENV=${1:-staging}
# staging/www
SUBDOMAIN=${2:-staging}

function get_from_gcp_secrets() {
  SEC_NAME=$1
  # Controlled in gcp secret  store
  SEC_KEY="cs-$DP_ENV-$SEC_NAME"
  echo $(gcloud secrets versions access latest --secret=$SEC_KEY --format='get(payload.data)' | tr '_-' '/+' | base64 -d)
}

MONGO_URL=$(get_from_gcp_secrets mongo-url)
METEOR_SETTINGS=$(get_from_gcp_secrets settings)
ROOT_URL="https://$SUBDOMAIN.commonswap.com"

# Create kube secret on cluste
kubectl create secret generic cs-$DP_ENV-sec \
--from-literal=root_url="$ROOT_URL" \
--from-literal=db_url="$MONGO_URL" \
--from-literal=meteor_settings="$METEOR_SETTINGS"
