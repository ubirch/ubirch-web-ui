#!/bin/sh

env
set -o nounset # abort on undefined variables.

bash copy-blockchain-settings.sh

bash preprocess4client.sh "${UBIRCH_TR_KC_REALM}"

echo "creating src/environments/environment.ts"
sed \
	-e "s%@@DEPLOYMENT_STAGE@@%${DEPLOYMENT_STAGE}%" \
	-e "s%@@UBIRCH_KC_URL@@%${UBIRCH_KC_URL}%" \
	-e "s%@@UBIRCH_TR_KC_REALM@@%${UBIRCH_TR_KC_REALM}%" \
	-e "s%@@UBIRCH_KC_CLIENTID@@%${UBIRCH_KC_CLIENTID}%" \
	-e "s%@@UBIRCH_TR_ENV_SERVURL@@%${UBIRCH_TR_ENV_SERVURL}%" \
	-e "s%@@UBIRCH_TR_API_PREF@@%${UBIRCH_TR_API_PREF}%" \
	-e "s%@@UBIRCH_TR_CLIENT_NAME@@%${UBIRCH_TR_CLIENT_NAME}%" \
	-e "s%@@UBIRCH_TR_DEFAULT_DEVICE_TYPE@@%${UBIRCH_TR_DEFAULT_DEVICE_TYPE}%" \
	-e "s%@@UBIRCH_TR_ENV_KEYSERVICE_SERVURL@@%${UBIRCH_TR_ENV_KEYSERVICE_SERVURL}%" \
	-e "s%@@UBIRCH_TR_API_KEYSERVICE_PREF@@%${UBIRCH_TR_API_KEYSERVICE_PREF}%" \
	-e "s%@@UBIRCH_TR_ENV_TOKENSERVICE_SERVURL@@%${UBIRCH_TR_ENV_TOKENSERVICE_SERVURL}%" \
	-e "s%@@UBIRCH_TR_API_TOKENSERVICE_PREF@@%${UBIRCH_TR_API_TOKENSERVICE_PREF}%" \
	-e "s%@@UBIRCH_TR_ENV_TRUSTSERVICE_SERVURL@@%${UBIRCH_TR_ENV_TRUSTSERVICE_SERVURL}%" \
	-e "s%@@UBIRCH_TR_API_VERIFY_PREF@@%${UBIRCH_TR_API_VERIFY_PREF}%" \
	-e "s%@@UBIRCH_VERIFICATION_TOKEN@@%${UBIRCH_VERIFICATION_TOKEN}%" \
	-e "s%@@UBIRCH_TR_GRAFANA_URL@@%${UBIRCH_TR_GRAFANA_URL}%" \
	-e "s%@@UBIRCH_TR_GRAFANA_ORG_ID@@%${UBIRCH_TR_GRAFANA_ORG_ID}%" \
	-e "s%@@UBIRCH_TR_GRAFANA_PANEL_MAP@@%${UBIRCH_TR_GRAFANA_PANEL_MAP}%" \
	-e "s%@@UBIRCH_TR_GRAFANA_DATASOURCE@@%${UBIRCH_TR_GRAFANA_DATASOURCE}%" \
	src/environments/environment.prod.ts > src/environments/environment.ts

# Run the dev server in production, this will need to be
# moved into a build step in the future, but for now the
# build process depends on variables only available at
# runtime, and thus must happen during runtime.
# Since we are already building everytime the container is
# restarted, we might also simply use the dev server.
npm run-script prod
