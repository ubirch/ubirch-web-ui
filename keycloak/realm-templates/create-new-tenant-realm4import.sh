#!/bin/bash

realmname=$1
serverurl=$2

if [[ $# -ne 2 ]]
then
      echo "Please add required parameters:"
      echo "  1. the name of the tenant realm"
      echo "  2. the server url with protocol and port if needed"
      echo "EXAMPLE:"
      echo ""
      echo "./create-new-tenant-realm4import.sh testmandant-realm http://localhost:8080"
else
      template="TENANT_REALM_TEMPLATE-export.json"
      importfile="$realmname-import.json"

      sed '/"id": "TENANT_REALM_TEMPLATE"/! s/"id": ".*"/"id": ""/g' $template | sed 's/"internalId": ".*"/"id": ""/g' | sed '/"id": ""/d' | sed "s#TENANT_REALM_TEMPLATE#$realmname#g" | sed "s#<SERVER_URL>#$serverurl#g" > $importfile

      echo "import $importfile in your keycloak instance"
fi
