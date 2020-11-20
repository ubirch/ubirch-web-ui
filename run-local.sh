#!/bin/bash

client=$1
staging=$2

if [[ -z "$client" ]]
then
    client=ubirch-default-realm
    echo "secure app by realm 'ubirch-default-realm'"
fi

./copy-blockchain-settings.sh

./preprocess4client.sh $client

if [[ -z "$staging" ]]
then
    echo "create verification widget on default stage (local)"
    cd widgets || exit
    npm run build:local
    cd ..

    echo "run app on default stage (dev)"
    ionic serve --port=9101
else
    echo "create verification widget on stage '$staging'"
    cd widgets || exit
    npm run build:$staging
    cd ..

    echo "run app on stage '$staging'"
    ionic serve --port=9101 --configuration=$staging
fi

