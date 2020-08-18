#!/bin/bash

# Used as a primer for all other scripts. 
# Adds color and absolute path env variables to make working with shell scripts easier
# USE VIA "./main.sh <script to run> <any flags or options>"

#Expect the following env variables: BIN_PATH, YELLOW, RED, GREEN, END_COLOR

export BIN_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export UROOT_PATH="$( cd $BIN_PATH/../../ && pwd )"

source "$BIN_PATH/command_line_colors.sh"

SCRIPT_TO_RUN=$1
shift;

echo -e "$GREEN====>Running Script $SCRIPT_TO_RUN $END_COLOR"
# Run script with any args after the file arg
eval "$BIN_PATH/$SCRIPT_TO_RUN.sh $@"