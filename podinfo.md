cd into ./munddrik

## create podinfo source

flux create source git podinfo --url=https://github.com/stefanprodan/podinfo --branch=master --interval=1m --export > ./clusters/my-cluster/podinfo-source.yaml

## create podinfo kustomization
flux create kustomization podinfo --target-namespace=default  --source=podinfo --path="./kustomize" --prune=true --wait=true --interval=30m --retry-interval=2m --health-check-timeout=3m --export > ./clusters/my-cluster/podinfo-kustomization.yaml