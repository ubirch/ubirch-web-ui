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
      template4realm="TENANT_REALM_TEMPLATE-export.json"
      template4connector="TENANT_REALM_TEMPLATE-connector.json"
      importfile="$realmname-import.json"
      importConnectorfile="$realmname-connector-import.json"

      sed '/"id": "TENANT_REALM_TEMPLATE"/! s/"id": ".*"/"id": ""/g' $template4realm | sed 's/"internalId": ".*"/"id": ""/g' | sed '/"id": ""/d' | sed "s#TENANT_REALM_TEMPLATE#$realmname#g" | sed "s#<SERVER_URL>#$serverurl#g" > $importfile

      echo "create a new realm from $importfile in your keycloak instance"

      sed "s#TENANT_REALM_TEMPLATE#$realmname#g" $template4connector | sed "s#<SERVER_URL>#$serverurl#g" > $importConnectorfile

      echo "Connect your new realm with the ubirch centralised login realm:"
      echo "  * create a new client from $importConnectorfile in your ubirch-2.0 realm in your keycloak instance"
      echo "  * create a new secret for the connector client"
      echo "  * add this secret to OpenId Connect Config of the IdentityProvider in your new tenant realm"
fi
