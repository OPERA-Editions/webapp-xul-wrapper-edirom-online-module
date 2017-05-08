#!/bin/bash

if [ -z "$JAVA" ]
then
  JAVA=$(which java)
fi

if [ -z "$JAVA" ]
then 
	echo "failure" > "$1"
	exit 0
else 
	echo "success" > "$1"
	exit 0
fi
