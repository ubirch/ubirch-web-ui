export type UbirchHashAlgorithm = 'sha256' | 'sha512';

export enum EInfo {
    PROCESSING_VERIFICATION_CALL = 1,
    VERIFICATION_SUCCESSFUL = 2
}

export enum EError {
    NO_ERROR = 0,
    CERTIFICATE_DATA_MISSING = 1,
    CERTIFICATE_ID_CANNOT_BE_FOUND = 2,
    VERIFICATION_FAILED_EMPTY_RESPONSE = 3,
    VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE = 4,
    VERIFICATION_FAILED = 5,
    UNKNOWN_ERROR = 99
}

export interface IUbirchVerificationConfig {
  algorithm: UbirchHashAlgorithm;
  elementSelector: string;
}

export interface IUbirchFormVerificationConfig extends IUbirchVerificationConfig {
  formIds: string[];
  paramsFormIdsMapping?: string[];
}

export interface IUbirchVerificationResponse {
    anchors: IUbirchVerificationAnchor[];
    prev: any; // @todo define type
    upp: string;
}

export interface IUbirchVerificationAnchor {
  label: string;
  properties: any;
}

export interface IUbirchVerificationAnchorProperties {
    blockchain: string;
    created: string;
    hash: string;
    message: string;
    network_info: string;
    network_type: string;
    prev_hash: string;
    public_chaing: string;
    status: string;
    timestamp: string;
    txid: string;
}

export interface IUbirchVerificationEnvConfig {
    verify_api_url: string;
    blockchain_transid_check_url: IUbirchBlockhainTransidCheckUrlMap;
    seal_icon_url: string;
    no_seal_icon_url: string;
    console_verify_url: string;
    assets_url_prefix: string;
}

export interface IUbirchBlockhainTransidCheckUrlMap {
    [key: string]: IUbirchBlockhainTransidCheckUrl;
}

export interface IUbirchBlockhainTransidCheckUrl {
    bdr?: IUbirchBlockchainNet;
    testnet?: IUbirchBlockchainNet;
    mainnet?: IUbirchBlockchainNet;
}

export interface IUbirchBlockchainNet {
    url: string;
    icon_url: string;
}

export interface IUbirchFormError {
  msg: string;
  missingIds: string[];
}
