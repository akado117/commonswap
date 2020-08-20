#!/bin/bash

function safe_create_symlink() {
  SYMLINK_PATH=$1
  rm -rf $UROOT_PATH/imports/$(basename $SYMLINK_PATH)
  ln -s $SYMLINK_PATH $UROOT_PATH/imports
}

safe_create_symlink ../node_modules/materialize-css

echo -e "$GREEN====>Completed linking node_modules to imports $END_COLOR"
