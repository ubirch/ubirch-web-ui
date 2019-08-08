#!/bin/bash

client=$1

if [ -z "$client" ]
then
      echo "Please add the name of the client as firt argument!"
      echo "EXAMPLE:"
      echo "./preprocess4client.sh test-mandant-1"
else
      path="./resources/clients/$client"
      themepath="$path/theme"
      envpath="$path/environments"
      assetspath="$path/assets"
      if [ -d $path ]
      then
        echo "Copy resources for client $client..."
        if [ -d $envpath ]
        then
            echo "Copy environment settings for client $client..."
            rm -rf ./src/environments/*
            cp -r $envpath/* ./src/environments/
        fi
        if [ -d $themepath ]
        then
            echo "Copy theme for client $client..."
            cp -r $themepath/* ./src/theme/
        fi
        if [ -d $assetspath ]
        then
            echo "Copy assets for client $client..."
            rm -rf ./src/assets/client/*
            cp -r $assetspath/* ./src/assets/client/
        fi
        echo "finished copying client resources"
      else
            echo "Directory $path DOES NOT exists!"
      fi

fi
