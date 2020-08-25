#!/bin/bash


DP_ENV=${1:-staging}

# variable replacement within deployment yaml
sed \
-e "s/%PROJECT_ID%/$GOOGLE_CLOUD_PROJECT/g" \
-e "s/%ENV%/$DP_ENV/g" \
"$UROOT_PATH/ops/kubectl/cs_deployment.yaml" > "$UROOT_PATH/ops/kubectl/cs_deployment_$DP_ENV.yaml"

# variable replacement within service yaml
sed \
-e "s/%ENV%/$DP_ENV/g" \
"$UROOT_PATH/ops/kubectl/cs_service.yaml" > "$UROOT_PATH/ops/kubectl/cs_service_$DP_ENV.yaml"

kubectl apply -f "$UROOT_PATH/ops/kubectl/cs_deployment_$DP_ENV.yaml"
kubectl apply -f "$UROOT_PATH/ops/kubectl/cs_service_$DP_ENV.yaml"
