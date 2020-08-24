#!/bin/bash

echo $(gcloud secrets versions access latest --secret=cs-staging-mongo-url --format='get(payload.data)' | tr '_-' '/+' | base64 -d)
