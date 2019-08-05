import {KeycloakConfig} from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'https://<KEYCLOAK_SERVER_URL>/auth',
  realm: '<KEYCLOAK_REALM_ID>',
  clientId: '<KEYCLOAK_CLIENT_ID>',
  credentials: {
    secret: '<KEYCLOAK_CREDENTIALS_SECRET>'
  }
};

export const environment = {
  production: true,
  client_logo_filename: 'logo.svg',
  client_startpage_image_filename: 'start_img.svg',
  client_description_filename: 'description.md',
  client_favicon_filename: 'favicon.ico',
  client_name: '<CLIENT_NAME_FOR_HEADER>',
  keycloak: keycloakConfig
};
