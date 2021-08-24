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
  VERIFICATION_NOT_POSSIBLE: {
    info: 'Errors in given data found - verification not possible',
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
  CERTIFICATE_ANCHORED_BY_NOT_AUTHORIZED_DEVICE: {
    info: '403 - unauthorized',
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
    info: 'mandatory form fields not set - if you scanned a QRCode it seems to be incorrect',
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
  ELEMENT_FOR_WIDGET_SELECTOR_NOT_FOUND: {
    info: `Element for widget selector not found`,
  },
  MISSING_PARAM_IDS: {
    info: 'Please, provide a string array with param ids'
  },
  PARAM_ID_MAPPING_MISSMATCH: {
    info: 'If you provide paramsFormIdsMapping define a mapping for each formId; they need to be in the same order'
  },
  MISSING_ACCESS_TOKEN: {
    info: 'You need to provide an accessToken to verify data',
  },
  DEACTIVATED: {
    headline: 'Verification cannot be processed!',
    info: 'ATTENTION!!! This module is no longer provided. Please tell the administrator of this website of app to use the npm package' +
      'ubirch-verification-js instead. (https://www.npmjs.com/package/@ubirch/ubirch-verification-js)',
  },
  UNKNOWN_ERROR: {
    info: 'An unexpected error occurred....!',
  },
};

