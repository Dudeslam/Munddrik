## port forwarding
### Get pods and find: prometheus-prometheus-kube-prometheus-prometheus-0
## Port forward the pod
kubectl port-forward -n default prometheus-prometheus-kube-prometheus-prometheus-0 9091:9090

https://www.squadcast.com/blog/install-prometheus-kubernetes


## Prometheus Values and configs
create value.yaml file
### use commands: 'helm upgrade -f new_values.yml [your_release_name] prometheus-community/prometheus'

helm install prometheus
helm install grafana
