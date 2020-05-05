#!/bin/sh

env

bash preprocess4client.sh "${UBIRCH_TR_KC_REALM}"
rm src/environments/environment.ts
mv src/environments/environment.prod.ts src/environments/environment.ts

echo "Replacing variables UBIRCH_KC_URL in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_KC_URL@@%${UBIRCH_KC_URL}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_KC_REALM in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_KC_REALM@@%${UBIRCH_TR_KC_REALM}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_KC_CLIENTID in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_KC_CLIENTID@@%${UBIRCH_KC_CLIENTID}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_KC_CRED_SECRET in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_KC_CRED_SECRET@@%${UBIRCH_TR_KC_CRED_SECRET}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_ENV_SERVURL in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_ENV_SERVURL@@%${UBIRCH_TR_ENV_SERVURL}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_API_PREF in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_API_PREF@@%${UBIRCH_TR_API_PREF}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_CLIENT_NAME in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_CLIENT_NAME@@%${UBIRCH_TR_CLIENT_NAME}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_DEFAULT_DEVICE_TYPE in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_DEFAULT_DEVICE_TYPE@@%${UBIRCH_TR_DEFAULT_DEVICE_TYPE}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_ENV_KEYSERVICE_SERVURL in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_ENV_KEYSERVICE_SERVURL@@%${UBIRCH_TR_ENV_KEYSERVICE_SERVURL}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_API_KEYSERVICE_PREF in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_API_KEYSERVICE_PREF@@%${UBIRCH_TR_API_KEYSERVICE_PREF}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_ENV_TRUSTSERVICE_SERVURL in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_ENV_TRUSTSERVICE_SERVURL@@%${UBIRCH_TR_ENV_TRUSTSERVICE_SERVURL}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_API_VERIFY_PREF in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_API_VERIFY_PREF@@%${UBIRCH_TR_API_VERIFY_PREF}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_GRAFANA_URL in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_GRAFANA_URL@@%${UBIRCH_TR_API_VERIFY_PREF}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_GRAFANA_ORG_ID in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_GRAFANA_ORG_ID@@%${UBIRCH_TR_API_VERIFY_PREF}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_GRAFANA_PANEL_ID in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_GRAFANA_PANEL_ID@@%${UBIRCH_TR_API_VERIFY_PREF}%" src/environments/environment.ts

npm run-script prod
