#!/bin/bash

client=$1
staging=$2

if [[ -z "$client" ]]
then
    client=ubirch-default-realm
    echo "secure app by realm 'ubirch-default-realm'"
fi

./preprocess4client.sh $client

./preprocess-replace-secrets.sh $client


if [[ -z "$staging" ]]
then
    echo "run app on default stage (dev)"
    ionic serve --port=9101
else
    echo "run app on stage '$staging'"
    ionic serve --port=9101 --configuration=$staging
fi

