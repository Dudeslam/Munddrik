# install in :C//
flux install --namespace=flux-system --network-policy=false --components=source-controller,helm-controller

# to remove uninstall it
flux uninstall --namespace=flux-system