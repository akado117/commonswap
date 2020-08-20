#!/bin/bash

# Used to asyncronously pull docker images. Makes life a bit easier when preparing Cloudbuilds
# local docker cache for runs. 
# When a dockerfile or docker command requests an image, it will pull it if its not availble
# By pre pulling these images before they're needed. They run almost instantly instead of having a pull image delay

function pull_image() {
  docker pull $1 || exit 0
}


for IMAGE in "$@"
do
  echo "Pulling image: $IMAGE"
  pull_image $IMAGE &
done

wait
