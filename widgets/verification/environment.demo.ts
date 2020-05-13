import { IUbirchVerificationEnvConfig } from './models';

export default {
    verify_api_url: '@@UBIRCH_WIDGET_VERIFY_URL@@',
    blockchain_transid_check_url: JSON.parse('@@UBIRCH_WIDGET_TRANSID_CHECK_URL@@'),
    seal_icon_url: '@@UBIRCH_SEAL_ICON_URL@@',
    no_seal_icon_url: '@@UBIRCH_NO_SEAL_ICON_URL@@'
} as IUbirchVerificationEnvConfig;
