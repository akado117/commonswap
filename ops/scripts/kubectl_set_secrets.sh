#!/bin/bash

MONGO_URL=$(gcloud secrets versions access latest --secret=cs-prod-mongo-url --format='get(payload.data)' | tr '_-' '/+' | base64 -d)
ROOT_URL="https://www.commonswap.com"


kubectl create secret generic cs-prod-sec --from-literal=root_url="$ROOT_URL" --from-literal=db_url="$MONGO_URL"
