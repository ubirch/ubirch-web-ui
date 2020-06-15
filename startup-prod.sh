#!/bin/sh

env

bash preprocess4client.sh "${UBIRCH_TR_KC_REALM}"
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
sed -i.bak "s%@@UBIRCH_TR_GRAFANA_URL@@%${UBIRCH_TR_GRAFANA_URL}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_GRAFANA_ORG_ID in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_GRAFANA_ORG_ID@@%${UBIRCH_TR_GRAFANA_ORG_ID}%" src/environments/environment.ts

echo "Replacing variables UBIRCH_TR_GRAFANA_PANEL_MAP in src/environments/environment.ts"
sed -i.bak "s%@@UBIRCH_TR_GRAFANA_PANEL_MAP@@%${UBIRCH_TR_GRAFANA_PANEL_MAP}%" src/environments/environment.ts

# copy back the file, so it can be used by the widgets subproject
cp src/environments/environment.ts src/environments/environment.prod.ts


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
