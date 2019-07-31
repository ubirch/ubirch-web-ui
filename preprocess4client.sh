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
            echo "Copy resources for client $client..."
            cp -r $path/* ./src
            echo "finished copying client resources"
      else
            echo "Directory $path DOES NOT exists!"
      fi

fi
