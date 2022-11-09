#!/bin/bash
set -e

: "${AZURE_USERNAME:?Need to set your AZURE_USERNAME}"
: "${AZURE_PASSWORD:?Need to set your AZURE_PASSWORD}"
: "${AZURE_RESOURCE_GROUP:?Need to set your AZURE_RESOURCE_GROUP}"
: "${AZURE_CLUSTER_NAME:?Need to set your AZURE_CLUSTER_NAME}"

echo "Logging into Microsoft Azure using credentials for ${AZURE_USERNAME}"
az login --username "${AZURE_USERNAME}" --password "${AZURE_PASSWORD}"

# Configure kubectl
echo "Configuring access for kubectl"
az aks get-credentials --resource-group "${AZURE_RESOURCE_GROUP}" --name "${AZURE_CLUSTER_NAME}"

if kubectl get deployments --namespace="${K8_NAMESPACE}" "${CI_PROJECT_NAME_LOWERCASE}"; then
# Force replace, delete and then re-create the resource. Will cause a service outage.
   if [ $CI_BUILD_REF_SLUG == "master" ]; then
      kubectl replace --namespace="${K8_NAMESPACE}" --force -f kubernetes.yaml || exit 1
   else
      kubectl --namespace="${K8_NAMESPACE}" set image deployment/$CI_PROJECT_NAME_LOWERCASE $CI_PROJECT_NAME_LOWERCASE=$APP_DOCKERIMAGE
   fi
else
    kubectl create --namespace="${K8_NAMESPACE}" -f kubernetes.yaml || exit 1
fi

# patch deployment for pod restart...
kubectl --namespace="${K8_NAMESPACE}" patch deployment $CI_PROJECT_NAME_LOWERCASE -p "{\"spec\":{\"template\":{\"metadata\":{\"labels\":{\"date\":\"`date --utc +%F_%H-%M-%S`\"}}}}}"



if kubectl get ing --namespace="${K8_NAMESPACE}" "o2c-nginx"; then
    kubectl replace --namespace="${K8_NAMESPACE}" -f Ingress.yaml || exit 1
else
    kubectl create --namespace="${K8_NAMESPACE}" -f Ingress.yaml || exit 1
fi
