#!/bin/bash

template4realm=$1
oldRealmName=$2
newRealmName=$3

if [[ $# -ne 3 ]]
then
      echo "Please add required parameters:"
      echo "  1. the file name of the realm export"
      echo "  2. the realm name used in the template file"
      echo "  2. the new realm name"
      echo "EXAMPLES:"
      echo ""
      echo "./remove-ids-from-keycloak-realm-export keycloak/realm-templates/myrealm.json old-realm-name new-realm-name"
else

      rm -rf test.json
      sed "s#$oldRealmName#TENANT_REALM_TEMPLATE#g" $template4realm | sed '/"id": "TENANT_REALM_TEMPLATE"/! s/"id": ".*"/"id": ""/g' | sed 's/"internalId": ".*"/"id": ""/g' | sed '/"id": ""/d' | sed "s#TENANT_REALM_TEMPLATE#$newRealmName#g" > test.json

fi
