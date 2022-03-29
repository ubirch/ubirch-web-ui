import version from '../../package.json';

const keycloakConfig: any = {
  url: '@@UBIRCH_KC_URL@@', // 'https://id.dev.ubirch.com/auth/realms/ubirch-2.0/account/',
  realm: '@@UBIRCH_TR_KC_REALM@@', // 'test-realm',
  clientId: '@@UBIRCH_KC_CLIENTID@@' // 'ubirch-2.0-user-access-public',
};

export const environment = {
  production: true,
  envName: '@@DEPLOYMENT_STAGE@@', // 'dev', 'demo' or 'prod'
  debug: false,
  version: version,
  serverUrl: '@@UBIRCH_TR_ENV_SERVURL@@', // 'http://localhost:8081',
  apiPrefix: '@@UBIRCH_TR_API_PREF@@', // '/ubirch-web-ui/api/v1/',
  keyServiceServerUrl: '@@UBIRCH_TR_ENV_KEYSERVICE_SERVURL@@', // 'https://key.dev.ubirch.com',
  keyServiceApiPrefix: '@@UBIRCH_TR_API_KEYSERVICE_PREF@@', // '/api/keyService/v1/',
  tokenServiceServerUrl: '@@UBIRCH_TR_ENV_TOKENSERVICE_SERVURL@@', // 'https://token.dev.ubirch.com',
  tokenServiceApiPrefix: '@@UBIRCH_TR_API_TOKENSERVICE_PREF@@', // '/api/tokens/v1/',
  trustServiceServerUrl: '@@UBIRCH_TR_ENV_TRUSTSERVICE_SERVURL@@', // 'https://verify.prod.ubirch.com',
  verifyApiPrefix: '@@UBIRCH_TR_API_VERIFY_PREF@@', // '/api/verify/',
  verificationToken: '@@UBIRCH_VERIFICATION_TOKEN@@', // wildcard verification token for dev/demo/qa/prod origin
  client_logo_filename: 'UBIRCH_Wort_Bildmarke_white.svg',
  client_startpage_image_filename: 'UBIRCH_Wort_Bildmarke_black.svg',
  client_description_filename: 'description.md',
  client_favicon_filename: 'favicon.ico',
  client_name: '@@UBIRCH_TR_CLIENT_NAME@@', // 'ubirch GmbH',
  add_client_name_to_logo: true,
  keycloak: keycloakConfig,
  default_device_type: '@@UBIRCH_TR_DEFAULT_DEVICE_TYPE@@', // ' unknownDeviceType',
  POLLING_INTERVAL_MILLISECONDS: 30000,
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
    graphDataSource: '@@UBIRCH_TR_GRAFANA_DATASOURCE@@',
    panelMap: JSON.parse('@@UBIRCH_TR_GRAFANA_PANEL_MAP@@')
  },
  lashHashesListLength: 30
};
