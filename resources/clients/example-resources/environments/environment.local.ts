// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Add here your keycloak setup infos
import {KeycloakConfig} from 'keycloak-angular';
import * as npm from '../../package.json';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: '<KEYCLOAK_REALM_ID>',
  clientId: '<KEYCLOAK_CLIENT_ID>',
  credentials: {
    secret: 'KEYCLOAK-CLIENT-SECRET'
  }
};

export const environment = {
  production: false,
  envName: 'local',
  debug: true,
  version: npm.version,
  serverUrl: 'http://localhost:8081',
  apiPrefix: '/ubirch-web-ui/api/v1/',
  keyServiceServerUrl: '<KEYSERVICE_REST_API_SERVER_URI>',
  keyServiceApiPrefix: '/api/keyService/v1/',
  trustServiceServerUrl: '<TRUSTSERVICE_REST_API_SERVER_URI>',
  verifyApiPrefix: '/api/upp/verify/',
  client_logo_filename: 'logo.svg',
  client_startpage_image_filename: 'start_img.svg',
  client_description_filename: 'description.md',
  client_favicon_filename: 'favicon.ico',
  client_name: '<CLIENT_NAME_FOR_HEADER>',
  add_client_name_to_logo: true,
  keycloak: keycloakConfig,
  default_device_type: 'default_type',
  POLLING_INTERVAL_MILLISECONDS: 60000,
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
  },
  deviceImport: {
    default: {
      rowSizeBytes: 1640,
      headerRowSizeBytes: 17,
      maximumRowsCount: 100000,
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
