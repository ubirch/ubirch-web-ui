#!/bin/sh

env
set -o nounset # abort on undefined variables.

bash preprocess4client.sh "${UBIRCH_TR_KC_REALM}"

echo "creating src/environments/environment.ts"
sed \
	-e "s%@@UBIRCH_KC_URL@@%${UBIRCH_KC_URL}%" \
	-e "s%@@UBIRCH_TR_KC_REALM@@%${UBIRCH_TR_KC_REALM}%" \
	-e "s%@@UBIRCH_KC_CLIENTID@@%${UBIRCH_KC_CLIENTID}%" \
	-e "s%@@UBIRCH_TR_KC_CRED_SECRET@@%${UBIRCH_TR_KC_CRED_SECRET}%" \
	-e "s%@@UBIRCH_TR_ENV_SERVURL@@%${UBIRCH_TR_ENV_SERVURL}%" \
	-e "s%@@UBIRCH_TR_API_PREF@@%${UBIRCH_TR_API_PREF}%" \
	-e "s%@@UBIRCH_TR_CLIENT_NAME@@%${UBIRCH_TR_CLIENT_NAME}%" \
	-e "s%@@UBIRCH_TR_DEFAULT_DEVICE_TYPE@@%${UBIRCH_TR_DEFAULT_DEVICE_TYPE}%" \
	-e "s%@@UBIRCH_TR_ENV_KEYSERVICE_SERVURL@@%${UBIRCH_TR_ENV_KEYSERVICE_SERVURL}%" \
	-e "s%@@UBIRCH_TR_API_KEYSERVICE_PREF@@%${UBIRCH_TR_API_KEYSERVICE_PREF}%" \
	-e "s%@@UBIRCH_TR_ENV_TRUSTSERVICE_SERVURL@@%${UBIRCH_TR_ENV_TRUSTSERVICE_SERVURL}%" \
	-e "s%@@UBIRCH_TR_API_VERIFY_PREF@@%${UBIRCH_TR_API_VERIFY_PREF}%" \
	-e "s%@@UBIRCH_TR_GRAFANA_URL@@%${UBIRCH_TR_GRAFANA_URL}%" \
	-e "s%@@UBIRCH_TR_GRAFANA_ORG_ID@@%${UBIRCH_TR_GRAFANA_ORG_ID}%" \
	-e "s%@@UBIRCH_TR_GRAFANA_PANEL_MAP@@%${UBIRCH_TR_GRAFANA_PANEL_MAP}%" \
	src/environments/environment.prod.ts > src/environments/environment.ts

echo "creating widgets/verification/environment.prod.ts"
sed -i \
	-e "s%@@UBIRCH_WIDGET_VERIFY_URL@@%${UBIRCH_WIDGET_VERIFY_URL}%" \
	-e "s%@@UBIRCH_WIDGET_TRANSID_CHECK_URL@@%${UBIRCH_WIDGET_TRANSID_CHECK_URL}%" \
	-e "s%@@UBIRCH_SEAL_ICON_URL@@%${UBIRCH_SEAL_ICON_URL:-ubirch_verify_right.png}%" \
	-e "s%@@UBIRCH_NO_SEAL_ICON_URL@@%${UBIRCH_NO_SEAL_ICON_URL:-ubirch_verify_wrong.png}%" \
	-e "s%@@UBIRCH_CONSOLE_VERIFICATION_URL@@%${UBIRCH_CONSOLE_VERIFICATION_URL}%" \
	-e "s%@@UBIRCH_WIDGET_ASSETS_PREFIX@@%${UBIRCH_WIDGET_ASSETS_PREFIX}%" \
	widgets/verification/environment.prod.ts

(
	# build widgets subproject.
	# This needs to be done at runtime, since it depends on some
	# variables only available at runtime. Additionally it depends
	# on the main project being already configured, which happens
	# at run time.
	#
	# This is a horrible design, but it is the only way I could
	# see, short of rewriting the entire thing.
	cd widgets
	npm install
	npm run "build:prod"
)

# Run the dev server in production, this will need to be
# moved into a build step in the future, but for now the
# build process depends on variables only available at
# runtime, and thus must happen during runtime.
# Since we are already building everytime the container is
# restarted, we might also simply use the dev server.
npm run-script prod
