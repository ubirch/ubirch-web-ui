import {IUbirchVerificationEnvConfig} from './models';

export default {
  verify_api_url: 'https://verify.dev.ubirch.com/api/upp/verify/anchor?blockchain_info=ext',
  console_verify_url: 'https://console.dev.ubirch.com/verification',
  assets_url_prefix: 'https://console.dev.ubirch.com/libs/verification/'
} as IUbirchVerificationEnvConfig;
