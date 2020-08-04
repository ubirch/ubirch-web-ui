import { IUbirchVerificationEnvConfig } from './models';

export default {
  verify_api_url: '@@UBIRCH_WIDGET_VERIFY_URL@@', // 'https://verify.prod.ubirch.com/api/upp/verify/anchor?blockchain_info=ext'
  blockchain_transid_check_url: JSON.parse('@@UBIRCH_WIDGET_TRANSID_CHECK_URL@@'),
// {
//   'ethereum-classic': {
//     testnet: {
//       url: 'https://kottiexplorer.ethernode.io/search?q=',
//       icon_url: 'Ethereum-Classic_verify_right.png'
//     },
//     mainnet: {
//       url: 'https://classic.etccoopexplorer.com/tx/0x',
//       icon_url: 'Ethereum-Classic_verify_right.png'
//     }
//   },
//   ethereum: {
//     testnet: {
//       url: 'https://rinkeby.etherscan.io/tx/',
//       icon_url: 'Ethereum_verify_right.png'
//     },
//     mainnet: {
//       url: 'https://etherscan.io/tx/',
//       icon_url: 'Ethereum_verify_right.png'
//     }
//   },
//   iota: {
//     testnet: {
//       url: 'https://comnet.thetangle.org/transaction/',
//       icon_url: 'IOTA_verify_right.png'
//     },
//     mainnet: {
//       url: 'https://thetangle.org/transaction/',
//       icon_url: 'IOTA_verify_right.png'
//     }
//   },
//  'gov-digital': {
//    mainnet: {
//      url: 'http://bcp-govdigi01.tir.budru.de/tx/',
//      icon_url: 'GovDigital_Icon_verify_right.png'
//    }
//  },
//   regioit: {
//     bdr: {
//       url: 'http://bcp-govdigi01.tir.budru.de/tx/',
//       icon_url: 'GovDigital_Icon_verify_right.png'
//     }
//   }
// }
  seal_icon_url: '@@UBIRCH_SEAL_ICON_URL@@', // 'ubirch_verify_right.png'
  no_seal_icon_url: '@@UBIRCH_NO_SEAL_ICON_URL@@', // 'ubirch_verify_wrong.png'
  console_verify_url: '@@UBIRCH_CONSOLE_VERIFICATION_URL@@', // 'https://console.prod.ubirch.com/verification'
  assets_url_prefix: '@@UBIRCH_WIDGET_ASSETS_PREFIX@@' // 'https://console.prod.ubirch.com/libs/verification/'
} as IUbirchVerificationEnvConfig;
