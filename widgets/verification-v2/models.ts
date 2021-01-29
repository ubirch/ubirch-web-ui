export type UbirchHashAlgorithm = 'sha256' | 'sha512';

export enum EInfo {
  PROCESSING_VERIFICATION_CALL = 1,
  VERIFICATION_SUCCESSFUL = 2
}

export enum EError {
  NO_ERROR = 'NO_ERROR',
  CERTIFICATE_DATA_MISSING = 'CERTIFICATE_DATA_MISSING',
  CERTIFICATE_ID_CANNOT_BE_FOUND = 'CERTIFICATE_ID_CANNOT_BE_FOUND',
  VERIFICATION_FAILED_EMPTY_RESPONSE = 'VERIFICATION_FAILED_EMPTY_RESPONSE',
  VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE = 'VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE',
  VERIFICATION_FAILED = 'VERIFICATION_FAILED',
  VERIFICATION_CURRENTLY_UNAVAILABLE = 'VERIFICATION_CURRENTLY_UNAVAILABLE',
  URL_PARAMS_CORRUPT = 'URL_PARAMS_CORRUPT',
  LOCATION_MALFORMED = 'LOCATION_MALFORMED',
  MANDATORY_FIELD_MISSING = 'MANDATORY_FIELD_MISSING',
  FILLING_FORM_WITH_PARAMS_FAILED = 'FILLING_FORM_WITH_PARAMS_FAILED',
  JSON_PARSE_FAILED = 'JSON_PARSE_FAILED',
  JSON_MALFORMED = 'JSON_MALFORMED',
  CANNOT_ACCESS_FORM_FIELD = 'CANNOT_ACCESS_FORM_FIELD',
  MISSING_PROPERTY_IN_UBRICH_VERIFICATION_INSTANCIATION = 'MISSING_PROPERTY_IN_UBRICH_VERIFICATION_INSTANCIATION',
  MISSING_ACCESS_TOKEN = 'MISSING_ACCESS_TOKEN',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export enum ELanguages {
  de = 'de',
  en = 'en'
}

export interface IUbirchVerificationConfig {
  algorithm: UbirchHashAlgorithm;
  elementSelector: string;
  accessToken: string;
  language?: ELanguages;
  HIGHLIGHT_PAGE_AFTER_VERIFICATION?: boolean;
  OPEN_CONSOLE_IN_SAME_TARGET?: boolean;
  NO_LINK_TO_CONSOLE?: boolean;
  debug?: boolean;
}

export interface IUbirchFormVerificationConfig extends IUbirchVerificationConfig {
  formIds: string[];
  paramsFormIdsMapping?: string[];
  optionalFormFieldIds?: string[];
  CHECK_FORM_FILLED?: boolean;
}

export interface IUbirchVerificationResponse {
  anchors: {
    upper_blockchains: IUbirchVerificationAnchor[]
  };
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
  seal_icon_url: string;
  no_seal_icon_url: string;
  console_verify_url: string;
  assets_url_prefix: string;
}

export interface IUbirchError {
  message: string;
  code: EError;
}

export interface IUbirchFormError extends IUbirchError {
  missingIds?: string[];
  notAllowedChars?: string[];
}

export interface IUbirchAnchorObject {
  href: any;
  target: string;
  title: string;
  icon: string;
}
