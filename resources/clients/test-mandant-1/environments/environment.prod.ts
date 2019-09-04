import {KeycloakConfig} from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'https://id.dev.ubirch.com/auth',
  realm: 'test-mandant-1',
  clientId: 'ubirch-2.0-user-access',
  credentials: {
    secret: '' // TODO:create-and-insert!!!
  }
};

export const environment = {
  production: true,
  serverUrl: 'http://localhost:8081',
  apiPrefix: '/ubirch-web-ui/api/v1/',
  client_logo_filename: 'UBIRCH_Bildmarke_black.svg',
  client_startpage_image_filename: 'UBIRCH_Wort_Bildmarke_black.svg',
  client_description_filename: 'description.md',
  client_favicon_filename: 'favicon.ico',
  client_name: 'ubirch GmbH',
  add_client_name_to_logo: true,
  keycloak: keycloakConfig,
  default_device_type: 'default_type',
  POLLING_INTERVAL_MILLISECONDS: 2500,
  LIST_ITEMS_PER_PAGE: 10
};
