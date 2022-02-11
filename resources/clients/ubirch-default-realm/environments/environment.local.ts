// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Add here your keycloak setup infos
const keycloakConfig: any = {
  url: 'http://localhost:8080/auth',
  realm: 'ubirch-default-realm',
  clientId: 'ubirch-2.0-user-access-local'
};

export const environment = {
  production: false,
  envName: 'local',
  debug: true,
  version: '0.9.1',
  serverUrl: 'https://api.console.dev.ubirch.com',
//  serverUrl: 'http://localhost:8081',
  apiPrefix: '/ubirch-web-ui/api/v1/',
  keyServiceServerUrl: 'https://key.dev.ubirch.com',
  keyServiceApiPrefix: '/api/keyService/v1/',
  tokenServiceServerUrl: 'https://token.dev.ubirch.com',
  tokenServiceApiPrefix: '/api/tokens/v2',
  trustServiceServerUrl: 'https://verify.dev.ubirch.com',
  verifyApiPrefix: '/api/upp/verify/',
  // ATTENTION: this token is valid for development only and only works until 2021-12-31!!!
  verificationToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rva2VuLmRldi51YmlyY2guY29tIiwic3ViIjoiYzBiNTc3ZmItMWNlZi00YzZmLThjNTAtOGQzYTFlNmVhNzUzIiwiYXVkIjoiaHR0cHM6Ly92ZXJpZnkuZGV2LnViaXJjaC5jb20iLCJleHAiOjE2NDA5Mzk2OTYsImlhdCI6MTYzMjI5NjEyMiwianRpIjoiNzkzMGQ0MWQtNTVmNi00ODgyLWE2ZjItMGRkOWI2NDUwMjA2Iiwic2NwIjpbInVwcDp2ZXJpZnkiXSwicHVyIjoiV2lsZGNhcmQgQ09OU09MRSBWZXJpZmljYXRpb24gVG9rZW4gKExPQ0FMSE9TVCkiLCJ0Z3AiOltdLCJ0aWQiOlsiKiJdLCJvcmQiOltdfQ.MUzGibZZ6DU91RBxaDYm9D7-TsF1QFappn2MjTUFEylXjkDAzHG-e-cuPjSvYEx2ugjS2ftsC9QLI-BZBn3yDw',
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
    url: 'https://grafana.tools.ubirch.com/d/iCrlVzxnk/simple-data-service',
    orgId: 1,
    from: 'now-3h',
    to: 'now',
    panelMap: {
      pysense: 1,
      pytrack: 2,
      testkit: 3,
    },
    graphDataSource: 'dev',
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
