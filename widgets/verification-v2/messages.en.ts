export const MESSAGES_EN = {
  PENDING: {
    info: '...verification pending....',
  },
  SUCCESS: {
    headline: 'Verification Successful!',
    info: 'For more information about anchoring click the ubirch icon to open verification details in ubirch console ' +
      'or click the blockchain icons to open corresponding blockchain explorer',
  },
  FAIL: {
    headline: 'Verification Failed!',
    info: 'No blockchain anchor for given data',
  },
  CERTIFICATE_DATA_MISSING: {
    info: 'Missing data - please fill out form completely or scan your QR code!!!',
  },
  VERIFICATION_FAILED: {
    info: 'Verification Failed!',
  },
  CERTIFICATE_ID_CANNOT_BE_FOUND: {
    info: 'Cannot find certificate!!!!!',
  },
  VERIFICATION_FAILED_EMPTY_RESPONSE: {
    info: 'Verification Failed!! Empty certificate or missing seal',
  },
  VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE: {
    info: 'Verification Failed!! Empty certificate or missing seal',
  },
  VERIFICATION_CURRENTLY_UNAVAILABLE: {
    info: 'Verification service is currently unavailable!',
  },
  URL_PARAMS_CORRUPT: {
    info: 'Called URL (from QRCode) contains at least one not allowed character that could corrupt this verification',
  },
  LOCATION_MALFORMED: {
    info: 'Called URL (from QRCode) is not in a correct URL format',
  },
  MANDATORY_FIELD_MISSING: {
    // tslint:disable-next-line:max-line-length
    info: 'mandatory form fields not set - You filled out a form manually? Please fill out all mandatory fields; You scanned an old QRCode? Sorry, probably some requirements changed',
  },
  FILLING_FORM_WITH_PARAMS_FAILED: {
    info: 'Unable to fill the form with the given parameters from called URL',
  },
  JSON_PARSE_FAILED: {
    info: 'JSON could not be parsed',
  },
  JSON_MALFORMED: {
    info: 'Building JSON from input fields failed',
  },
  CANNOT_ACCESS_FORM_FIELD: {
    info: 'Unable to access input field',
  },
  MISSING_PROPERTY_IN_UBRICH_VERIFICATION_INSTANCIATION: {
    info: 'Please, provide the `elementSelector` to UbirchVerification or UbirchFormVerification instance',
  },
  MISSING_ACCESS_TOKEN: {
    info: 'You need to provide an accessToken to verify data',
  },
  UNKNOWN_ERROR: {
    info: 'An unexpected error occurred....!',
  },
};

