export type UbirchHashAlgorithm = 'sha256' | 'sha512';

export enum EInfo {
  PROCESSING_VERIFICATION_CALL = 1,
  VERIFICATION_SUCCESSFUL = 2
}

export enum EError {
  NO_ERROR = 0,
  CERTIFICATE_DATA_MISSING = 1,
  CERTIFICATE_ID_CANNOT_BE_FOUND = 2,
  VERIFICATION_FAILED_EMPTY_RESPONSE = 10,
  VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE = 11,
  VERIFICATION_FAILED = 12,
  VERIFICATION_CURRENTLY_UNAVAILABLE = 13,
  URL_PARAMS_CORRUPT = 20,
  LOCATION_MALFORMED = 21,
  MANDATORY_FIELD_MISSING = 25,
  FILLING_FORM_WITH_PARAMS_FAILED = 26,
  JSON_PARSE_FAILED = 30,
  JSON_MALFORMED = 31,
  CANNOT_ACCESS_FORM_FIELD = 40,
  MISSING_PROPERTY_IN_UBRICH_VERIFICATION_INSTANCIATION = 50,
  MISSING_ACCESS_TOKEN = 51,
  UNKNOWN_ERROR = 99
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
