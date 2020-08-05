// ATTENTION!!!!
//
// This file will be replaced by resources/constants/blockchain-settings.const.ts on startup by shell scripts!!
// Please change your settings there

export const BlockchainSettings = {
  'ethereum-classic': {
    nodeIcon: 'assets/app-icons/Ethereum-Classic_verify_right.png',
    explorerUrl: {
      testnet: {
        url: 'https://kottiexplorer.ethernode.io/search?q='
      },
      mainnet: {
        url: 'https://gastracker.io/search?q='
      }
    }
  },
  ethereum: {
    nodeIcon: 'assets/app-icons/Ethereum_verify_right.png',
    explorerUrl: {
      testnet: {
        url: 'https://rinkeby.etherscan.io/tx/'
      },
      mainnet: {
        url: 'https://etherscan.io/tx/'
      }
    }
  },
  iota: {
    nodeIcon: 'assets/app-icons/IOTA_verify_right.png',
    explorerUrl: {
      testnet: {
        url: 'https://comnet.thetangle.org/transaction/'
      },
      mainnet: {
        url: 'https://thetangle.org/transaction/'
      }
    }
  },
  'gov-digital': {
    nodeIcon: 'assets/app-icons/GovDigital_Icon_verify_right.png',
    explorerUrl: {
      mainnet: {
        url: 'http://bcp-govdigi01.tir.budru.de/tx/'
      }
    }
  },
  regioit: {
    nodeIcon: 'assets/app-icons/GovDigital_Icon_verify_right.png',
    explorerUrl: {
      bdr: {
        url: 'http://bcp-govdigi01.tir.budru.de/tx/'
      }
    }
  }
};
