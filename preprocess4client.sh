#!/bin/bash

client=$1

if [ -z "$client" ]
then
      echo "Please add the name of the client as firt argument!"
      echo "EXAMPLE:"
      echo "./preprocess4client.sh test-mandant-1"
else
      path="./resources/clients/$client"
      if [ -d $path ]
      then
            echo "Copy files for client $client..."
            cp -r $path ./src
      else
            echo "Directory $path DOES NOT exists!"
      fi

fi
