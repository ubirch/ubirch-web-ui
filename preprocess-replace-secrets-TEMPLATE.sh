#!/bin/bash

client=$1

if [[ -z "$client" ]]
then
      echo "Please add the name of the tenant as first argument!"
      echo "EXAMPLE:"
      echo "./preprocess4client.sh test-realm"
else

  echo "copy preprocess-replace-secrets-TEMPLATE.sh to preprocess-replace-secrets.sh"
  echo "In preprocess-replace-secrets.sh create for every tenant/client you have an additional block of this:"
  echo
  echo 'if [[ "$client" == "ubirch-default-realm" ]]'
  echo 'then'
  echo 'local="<ADD-LOCAL-KEYCLOAK-CLIENT-SECRET>"'
  echo 'dev="<ADD-ONLINE-DEV-KEYCLOAK-CLIENT-SECRET>"'
  echo 'fi'
  echo
  echo "replace in every block manually:"
  echo "       <TENANT-NAME> with the name of the tenant realm in your keycloak installations (local and online)"
  echo "       <ADD-LOCAL-KEYCLOAK-CLIENT-SECRET> with secret (credentials) of client ubirch-2.0-user-access of your tenant realm in your local keycloak installation"
  echo "       <ADD-ONLINE-DEV-KEYCLOAK-CLIENT-SECRET> with secret (credentials) of client ubirch-2.0-user-access of your tenant realm in your online dev keycloak installation"
  echo "!!!!! TAKE CARE TO NOT !!!! PUSH preprocess-replace-secrets.sh ON GITHUB !!!!!!"

  if [[ "$client" == "<TENANT-NAME>" ]]
  then
    local="<ADD-LOCAL-KEYCLOAK-CLIENT-SECRET>"
    dev="<ADD-ONLINE-DEV-KEYCLOAK-CLIENT-SECRET>"
  fi


  envpath="./src/environments"
  localenv="$envpath/environment.local.ts"
  devenv="$envpath/environment.ts"
  localtempfile="$envpath/environment.local2.ts"
  devtempfile="$envpath/environment.dev2.ts"

  sed "s#KEYCLOAK-CLIENT-SECRET#$local#g" $localenv > $localtempfile
  sed "s#KEYCLOAK-CLIENT-SECRET#$dev#g" $devenv > $devtempfile

  mv $localtempfile $localenv
  mv $devtempfile $devenv

  echo "Secrets are replaced in environment files"

fi
