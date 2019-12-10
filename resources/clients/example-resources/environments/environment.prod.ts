import {KeycloakConfig} from 'keycloak-angular';
import * as npm from '../../package.json';

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
  envName: 'prod',
  debug: false,
  version: npm.version,
  serverUrl: '@@UBIRCH_TR_ENV_SERVURL@@', // 'http://localhost:8081',
  apiPrefix: '@@UBIRCH_TR_API_PREF@@', // '/ubirch-web-ui/api/v1/',
  keyServiceServerUrl: '@@UBIRCH_TR_ENV_KEYSERVICE_SERVURL@@', // 'https://key.dev.ubirch.com',
  keyServiceApiPrefix: '@@UBIRCH_TR_API_KEYSERVICE_PREF@@', // '/api/keyService/v1/',
  trustServiceServerUrl: '@@UBIRCH_TR_ENV_TRUSTSERVICE_SERVURL@@', // 'https://verify.prod.ubirch.com',
  verifyApiPrefix: '@@UBIRCH_TR_API_VERIFY_PREF@@', // '/api/verify/',
  client_logo_filename: 'logo.svg',
  client_startpage_image_filename: 'start_img.svg',
  client_description_filename: 'description.md',
  client_favicon_filename: 'favicon.ico',
  client_name: '@@UBIRCH_TR_CLIENT_NAME@@', // 'ubirch GmbH',
  add_client_name_to_logo: true,
  keycloak: keycloakConfig,
  default_device_type: '@@UBIRCH_TR_DEFAULT_DEVICE_TYPE@@', // ' unknownDeviceType',
  POLLING_INTERVAL_MILLISECONDS: 15000,
  LIST_ITEMS_PER_PAGE: 10,
  DATE_TIME_ZONE_FORMAT: 'dd.MM.yyyy, HH:mm:ss (zzz)',
  blockchain_transid_check_url: {
    '<BLOCKCHAIN_ID>': {
      testnet: {
        url: '<BLOCKCHAIN_EXPLORER_URL_TESTNET>',
        icon_url: '<BLOCKCHAIN_SUCCESS_ICON>'
      },
      mainnet: {
        url: '<BLOCKCHAIN_EXPLORER_URL_MAINNET>',
        icon_url: '<BLOCKCHAIN_SUCCESS_ICON>'
      }
    }
  }
};
