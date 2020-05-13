export type UbirchHashAlgorithm = 'sha256' | 'sha512';

export enum EInfo {
    PROCESSING_VERIFICATION_CALL = 1,
    VERIFICATION_SUCCESSFUL = 2
};

export enum EError {
    NO_ERROR = 0,
    CERTIFICATE_DATA_MISSING = 1,
    CERTIFICATE_ID_CANNOT_BE_FOUND = 2,
    VERIFICATION_FAILED_EMPTY_RESPONSE = 3,
    VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE = 4,
    UNKNOWN_ERROR = 99
}

export interface IUbirchVerificationConfig {
    algorithm: UbirchHashAlgorithm;
    elementSelector: string;
}
