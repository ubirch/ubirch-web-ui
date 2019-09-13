#!/bin/bash

client=$1

if [[ -z "$client" ]]
then
    client=test-realm
    echo "secure app by realm 'test-realm'"
fi

./preprocess4client.sh $client

ionic serve --port=9101
