#!/bin/bash

sed -i'.old' -e "s/%PROJECT_ID%/$GOOGLE_CLOUD_PROJECT/g" "$UROOT_PATH/ops/kubectl/meteor_deployment.yaml"

kubectl create -f $UROOT_PATH/ops/kubectl/meteor_deployment.yaml
kubectl create -f $UROOT_PATH/ops/kubectl/meteor_service.yaml
