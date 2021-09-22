// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Add here your keycloak setup infos
import * as npm from '../../package.json';

const keycloakConfig: any = {
  url: 'http://localhost:8080/auth',
  realm: '<KEYCLOAK_REALM_ID>',
  clientId: '<KEYCLOAK_CLIENT_ID>'
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
  tokenServiceServerUrl: '<TOKENSERVICE_REST_API_SERVER_URI>',
  tokenServiceApiPrefix: '/api/tokens/v1',
  trustServiceServerUrl: '<TRUSTSERVICE_REST_API_SERVER_URI>',
  verifyApiPrefix: '/api/upp/verify/',
  verificationToken: '<WILDCARD_VERIFICATION_TOKEN>', // wildcard verification token for dev/demo/qa/prod origin
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


  deviceImport: {
    default: {
      rowSizeBytes: 1640,
      headerRowSizeBytes: 17,
      maximumRowsCount: 100000,
    }
  },
  deviceData: {
    url: '@@UBIRCH_TR_GRAFANA_URL@@',
    orgId: '@@UBIRCH_TR_GRAFANA_ORG_ID@@',
    from: 'now-3h',
    to: 'now',
    panelMap: JSON.parse('@@UBIRCH_TR_GRAFANA_PANEL_MAP@@')
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
