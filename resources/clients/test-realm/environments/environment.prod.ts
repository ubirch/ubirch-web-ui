import {KeycloakConfig} from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: '@@UBIRCH_KC_URL@@', // 'https://id.dev.ubirch.com/auth/realms/ubirch-2.0/account/',
  realm: '@@UBIRCH_TR_KC_REALM@@', // 'test-realm',
  clientId: '@@UBIRCH_KC_CLIENTID@@', // 'ubirch-2.0-user-access',
  credentials: {
    secret: '@@UBIRCH_TR_KC_CRED_SECRET@@' // ''
  }
};

export const environment = {
  production: true,
  serverUrl: '@@UBIRCH_TR_ENV_SERVURL@@', // 'http://localhost:8081',
  apiPrefix: '@@UBIRCH_TR_API_PREF@@', // '/ubirch-web-ui/api/v1/',
  client_logo_filename: 'UBIRCH_Wort_Bildmarke_white.svg',
  client_startpage_image_filename: 'UBIRCH_Wort_Bildmarke_black.svg',
  client_description_filename: 'description.md',
  client_favicon_filename: 'favicon.ico',
  client_name: '@@UBIRCH_TR_CLIENT_NAME@@', // 'ubirch GmbH',
  add_client_name_to_logo: true,
  keycloak: keycloakConfig,
  default_device_type: '@@UBIRCH_TR_DEFAULT_DEVICE_TYPE@@', // ' unknownDeviceType',
  POLLING_INTERVAL_MILLISECONDS: 2500,
  LIST_ITEMS_PER_PAGE: 10
};
