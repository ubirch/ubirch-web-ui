import { IUbirchVerificationEnvConfig } from './models';

export default {
    verify_api_url: '@@UBIRCH_WIDGET_VERIFY_URL@@',
    blockchain_transid_check_url: JSON.parse('@@UBIRCH_WIDGET_TRANSID_CHECK_URL@@'),
    seal_icon_url: '@@UBIRCH_SEAL_ICON_URL@@',
    no_seal_icon_url: '@@UBIRCH_NO_SEAL_ICON_URL@@',
    console_verify_url: '@@UBIRCH_CONSOLE_VERIFICATION_URL@@',
    assets_url_prefix: '@@UBIRCH_WIDGET_ASSETS_PREFIX@@'
} as IUbirchVerificationEnvConfig;
