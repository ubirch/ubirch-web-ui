#!/bin/bash

client=$1

if [[ -z "$client" ]]
then
      echo "Please add the name of the client as firt argument!"
      echo "EXAMPLE:"
      echo "./preprocess4client.sh test-mandant-1"
else
      path="./resources/clients/$client"
      themepath="$path/theme"
      envpath="$path/environments"
      assetspath="$path/assets"
      if [[ -d $path ]]
      then
        echo "Copy resources for client $client..."
        if [[ -d $envpath ]]
        then
            echo "Copy environment settings for client $client..."
            if [[ -d ./src/environments ]]
            then
                rm -rf ./src/environments/*
            else
                mkdir ./src/environments
            fi
            cp -r $envpath/* ./src/environments/
        fi
        if [[ -d $themepath ]]
        then
            echo "Copy theme for client $client..."
            if [[ ! -d ./src/theme ]]
            then
                mkdir ./src/theme
            fi
            cp -r $themepath/* ./src/theme/
        fi
        if [[ -d $assetspath ]]
        then
            echo "Copy assets for client $client..."
            if [[ -d ./src/assets/client ]]
            then
                rm -rf ./src/assets/client/*
            else
                mkdir ./src/assets/client
            fi
            cp -r $assetspath/* ./src/assets/client/
        fi
        echo "finished copying client resources"
      else
            echo "Directory $path DOES NOT exists!"
      fi

fi
