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
  keyServiceApiPrefix: '@@UBIRCH_TR_KEYSERVICE_API_PREF@@', // '/api/keyService/v1/',
  trustServiceServerUrl: '@@UBIRCH_TR_ENV_TRUSTSERVICE_SERVURL@@', // 'https://verify.prod.ubirch.com',
  verifyApiPrefix: '@@UBIRCH_TR_API_VERIFY_PREF@@', // '/api/verify/',
  client_logo_filename: 'UBIRCH_Wort_Bildmarke_white.svg',
  client_startpage_image_filename: 'UBIRCH_Wort_Bildmarke_black.svg',
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
    'ethereum-classic': {
      testnet: {
        url: 'https://kottiexplorer.ethernode.io/search?q=',
        icon_url: '/wp-content/uploads/2019/08/Ethereum-Classic_verify_right.png'
      },
      mainnet: {
        url: 'https://gastracker.io/search?q=',
        icon_url: '/wp-content/uploads/2019/08/Ethereum-Classic_verify_right.png'
      }
    },
    ethereum: {
      testnet: {
        url: 'https://rinkeby.etherscan.io/tx/',
        icon_url: '/wp-content/uploads/workshop_images/Ethereum_verify_right.png'
      },
      mainnet: {
        url: 'https://etherscan.io/tx/',
        icon_url: '/wp-content/uploads/workshop_images/Ethereum_verify_right.png'
      }
    },
    iota: {
      testnet: {
        url: 'https://comnet.thetangle.org/transaction/',
        icon_url: '/wp-content/uploads/workshop_images/IOTA_verify_right.png'
      },
      mainnet: {
        url: 'https://thetangle.org/transaction/',
        icon_url: '/wp-content/uploads/workshop_images/IOTA_verify_right.png'
      }
    },
    regioit: {
      bdr: {
        url: 'https://rinkeby.etherscan.io/tx/',
        icon_url: '/fileadmin/Bilder/Zertifikate/govlogo_small.png'
      }
    }
  },
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
    panelMap: {
      pysense: 1,
      pytrack: 2,
    }
  }
};
