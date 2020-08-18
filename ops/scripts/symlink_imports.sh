#!/bin/bash

(
  cd $UROOT_PATH/imports

  ln -s ../node_modules/materialize-css .
)

echo -e "$GREEN====>Completed linking node_modules to imports $END_COLOR"
