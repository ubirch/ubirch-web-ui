// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Add here your keycloak setup infos
import * as npm from '../../package.json';

const keycloakConfig: any = {
  url: 'https://id.prod.ubirch.com/auth',
  realm: 'ubirch-default-realm',
  clientId: 'ubirch-2.0-user-access-public'
};

export const environment = {
  production: false,
  envName: 'dev',
  debug: false,
  version: npm.version,
  serverUrl: 'https://api.console.prod.ubirch.com',
  apiPrefix: '/ubirch-web-ui/api/v1/',
  keyServiceServerUrl: 'https://key.prod.ubirch.com',
  keyServiceApiPrefix: '/api/keyService/v1/',
  trustServiceServerUrl: 'https://verify.prod.ubirch.com',
  verifyApiPrefix: '/api/upp/verify/',
  client_logo_filename: 'UBIRCH_Wort_Bildmarke_white.svg',
  client_startpage_image_filename: 'UBIRCH_Wort_Bildmarke_black.svg',
  client_description_filename: 'description.md',
  client_favicon_filename: 'favicon.ico',
  client_name: 'ubirch GmbH',
  add_client_name_to_logo: true,
  keycloak: keycloakConfig,
  default_device_type: 'default_type',
  POLLING_INTERVAL_MILLISECONDS: 60000,
  LIST_ITEMS_PER_PAGE: 10,

  deviceImport: {
    default: {
      rowSizeBytes: 1640,
      headerRowSizeBytes: 17,
      maximumRowsCount: 100000,
    }
  },
  deviceData: {
    url: 'https://dashboard.dev.ubirch.com/d-solo/qfa7xZhWz/simple-data-service',
    orgId: 1,
    from: 'now-3h',
    to: 'now',
    panelMap: {
      pysense: 1,
      pytrack: 2,
      testkit: 3,
    }
  },
  lashHashesListLength: 30
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
