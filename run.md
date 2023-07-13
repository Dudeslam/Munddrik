## Run script
    kubectl create -f .\backend-deployment.yaml 
    kubectl create -f .\frontend-deployment.yaml 
    kubectl create -f .\frontend-service.yaml 
    kubectl create -f .\backend-service.yaml 
    kubectl create -f .\munddrik-default-networkpolicy.yaml 

## apply script
    kubectl apply -f .\backend-deployment.yaml 
    kubectl apply -f .\frontend-deployment.yaml 
    kubectl apply -f .\frontend-service.yaml 
    kubectl apply -f .\backend-service.yaml 
    kubectl apply -f .\munddrik-default-networkpolicy.yaml 

## stop and delete script
    kubectl delete -f .\backend-deployment.yaml 
    kubectl delete -f .\frontend-deployment.yaml 
    kubectl delete -f .\frontend-service.yaml 
    kubectl delete -f .\backend-service.yaml 
    kubectl delete -f .\munddrik-default-networkpolicy.yaml 


## forward port to test locally
    kubectl port-forward service/frontend 8081:8081
    kubectl port-forward service/backend 8080:8080