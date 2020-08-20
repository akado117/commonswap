#!/bin/bash

METEOR_CODE=meteor_code.tar
JS_CONFIG=js_config.tar

COPY_TO=$COPY_TO || /workspace

function gnu_tar() {
  if hash gtar 2>/dev/null; then
    # Because mac does not come with GNU tar - gtar is installed via brew
    gtar "$@"
  else
    tar "$@"
  fi
}

# This is used to create tarballs builds can use and to tarball contents of builds to move to docker container independent volumes

function tar_it() {
  gnu_tar \
   --sort=name \
      --mtime="2020-04-15 00:00Z" \
      --owner=0 --group=0 --numeric-owner \
      --format=gnu \
      -c $@
}

function tar_js_config() {
  tar_it \
  -f $JS_CONFIG \
  ./package.json
  ./package-lock.json
}

# Should only need transpiled results of node project - since the base image has all the elixir stuff it needs
function tar_core_code() {
  tar_it \
  -f $METEOR_CODE \
  ./
}

if echo "$@" | grep "js-config" ; then
  echo "tarballing js code"
  tar_js_config &
fi

if echo "$@" | grep "core" ; then
  echo "tarballing core code"
  tar_core_code &
fi

wait
echo "tarballing complete" && ls ./

# For copying to workspace n such

# if echo "$@" | grep "copy_t" ; then
#   cp ./$TRANS_RES $COPY_TO &
# fi

wait
