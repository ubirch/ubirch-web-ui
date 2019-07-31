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
  keycloak: keycloakConfig
};
