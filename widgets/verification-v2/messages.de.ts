export const MESSAGES_DE = {
  PENDING: {
    info: '...Verifikation wird durchgeführt....',
  },
  SUCCESS: {
    headline: 'Verifikation erfolgreich!',
      info: 'Für zusätzliche Informationen zur Verankerung klicken Sie auf das ubirch Icon um die Details der Verifikation in der ' +
    'ubirch Konsole anzuzeigen oder auf die Blockchain Icons um den jeweiligen Blockchain-Explorer zu öffnen',
  },
  FAIL: {
    headline: 'Verifikation fehlgeschlagen!',
    info: 'Zu den eingegebenen Daten gibt es keine Blockchain-Verankerung',
  },
  VERIFICATION_NOT_POSSIBLE: {
    info: 'Die eingegebenen Daten sind fehlerhaft und konnten nicht verifiziert werden',
  },
  CERTIFICATE_DATA_MISSING: {
    info: 'Zertifikatsdaten fehlen - bitte füllen Sie das Formular aus oder scannen Sie Ihren QR-Code!!!',
  },
  VERIFICATION_FAILED: {
    info: 'Verifikation fehlgeschlagen!',
  },
  CERTIFICATE_ID_CANNOT_BE_FOUND: {
    info: 'Zertifikat konnte nicht gefunden werden!!!!!',
  },
  VERIFICATION_FAILED_EMPTY_RESPONSE: {
    info: 'Verifikation fehlgeschlagen!! Zertifikat ist leer oder enthält kein Siegel',
  },
  VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE: {
    info: 'Verifikation fehlgeschlagen!! Zertifikat ist leer oder enthält kein Siegel',
  },
  VERIFICATION_CURRENTLY_UNAVAILABLE: {
    info: 'Verifikationsdienst ist vorübergehend nicht verfügbar!',
  },
  URL_PARAMS_CORRUPT: {
    // tslint:disable-next-line:max-line-length
    info: 'Die aufgerufene URL / der gescannte QRCode enthält nicht erlaubte Zeichen. Eine Verifikation wird nicht durchgeführt da sie korrupt sein könnte',
  },
  LOCATION_MALFORMED: {
    info: 'Die aufgerufene URL / der gescannte QRCode hat kein richtiges URL-Format',
  },
  MANDATORY_FIELD_MISSING: {
    info: 'Nicht alle Pflichtfelder wurden ausgefüllt - Falls Sie einen QRCode gescannt haben, ist dieser fehlerhaft',
  },
  FILLING_FORM_WITH_PARAMS_FAILED: {
    info: 'Das Formular konnte nicht mit den Werten aus dem Aufruf gefüllt werden',
  },
  JSON_PARSE_FAILED: {
    info: 'Das interne JSON Datenformat enthält einen Fehler und konnte nicht gelesen werden',
  },
  JSON_MALFORMED: {
    info: 'Das Erzeugen des internen JSON Datenformats aus den Eingabefeldern ist fehlgeschlagen',
  },
  CANNOT_ACCESS_FORM_FIELD: {
    info: 'Eingabefeld konnte nicht ausgelesen werden',
  },
  MISSING_PROPERTY_IN_UBRICH_VERIFICATION_INSTANCIATION: {
    info: 'Fehler beim Erstellen der Ubirch(Form)Verification Instanz auf der Seite: das Attribut `elementSelector` wurde nicht gesetzt',
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
    // tslint:disable-next-line:max-line-length
    info: 'Fehler beim Erstellen der Ubirch(Form)Verification Instanz auf der Seite: es wurde kein `accessToken` zum Verifizieren der Daten angegeben',
  },
  UNKNOWN_ERROR: {
    info: 'Problem!!! Ein unerwarteter Fehler ist aufgetreten....!',
  },
};
