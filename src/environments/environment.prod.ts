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
  client_logo_filename: 'UBIRCH_Bildmarke_black.svg',
  client_startpage_image_filename: 'UBIRCH_Wort_Bildmarke_black.svg',
  client_description_filename: 'description.md',
  client_favicon_filename: 'favicon.ico',
  client_name: 'ubirch GmbH',
  add_client_name_to_logo: true,
  keycloak: keycloakConfig
};
