import { IUbirchVerificationEnvConfig } from './models';

export default {
  verify_api_url: '@@UBIRCH_WIDGET_VERIFY_URL@@', // 'https://verify.prod.ubirch.com/api/upp/verify/anchor?blockchain_info=ext'
  seal_icon_url: '@@UBIRCH_SEAL_ICON_URL@@', // 'ubirch_verify_right.png'
  no_seal_icon_url: '@@UBIRCH_NO_SEAL_ICON_URL@@', // 'ubirch_verify_wrong.png'
  console_verify_url: '@@UBIRCH_CONSOLE_VERIFICATION_URL@@', // 'https://console.prod.ubirch.com/verification'
  assets_url_prefix: '@@UBIRCH_WIDGET_ASSETS_PREFIX@@' // 'https://console.prod.ubirch.com/libs/verification/'
} as IUbirchVerificationEnvConfig;
