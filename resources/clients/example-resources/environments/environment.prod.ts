import {KeycloakConfig} from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'https://<KEYCLOAK_SERVER_URL>/auth',
  realm: '<KEYCLOAK_REALM_ID>',
  clientId: '<KEYCLOAK_CLIENT_ID>',
  credentials: {
    secret: '<KEYCLOAK_CLIENT_CREDENTIALS_SECRET>'
  }
};

export const environment = {
  production: true,
  serverUrl: '<REST_API_SERVER_URI>',
  apiPrefix: '/ubirch-web-ui/api/v1/',
  keyServiceServerUrl: '<REST_API_SERVER_URI>',
  keyServiceApiPrefix: '/api/keyService/v1/',
  client_logo_filename: 'logo.svg',
  client_startpage_image_filename: 'start_img.svg',
  client_description_filename: 'description.md',
  client_favicon_filename: 'favicon.ico',
  client_name: '<CLIENT_NAME_FOR_HEADER>',
  add_client_name_to_logo: true,
  keycloak: keycloakConfig,
  default_device_type: 'default_type',
  POLLING_INTERVAL_MILLISECONDS: 2500,
  LIST_ITEMS_PER_PAGE: 10,
  DATE_TIME_ZONE_FORMAT: 'dd.MM.yyyy, HH:mm:ss (zzz)'
};
