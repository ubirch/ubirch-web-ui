import { sha256 } from 'js-sha256';
import { sha512 } from 'js-sha512';
import * as BlockchainSettings from '../../resources/blockchain-settings.json';
import { IUbirchBlockchain } from '../../src/app/models/iubirch-blockchain';
import { IUbirchBlockchainNet } from '../../src/app/models/iubirch-blockchain-net';
import '../../src/assets/app-icons/alert-circle-red.svg';
import '../../src/assets/app-icons/bloxberg_verify_right.png';
import '../../src/assets/app-icons/Ethereum-Classic_verify_right.png';
import '../../src/assets/app-icons/Ethereum_verify_right.png';
import '../../src/assets/app-icons/GovDigital_Icon_verify_right.png';
import '../../src/assets/app-icons/IOTA_verify_right.png';
import '../../src/assets/app-icons/ubirch_verify_right.png';
import '../../src/assets/app-icons/ubirch_verify_wrong.png';
import environment from './environment.dev';
import { MESSAGES_DE } from './messages.de';
import { MESSAGES_EN } from './messages.en';
import {
  EError,
  EInfo,
  IUbirchFormError,
  IUbirchFormVerificationConfig,
  IUbirchVerificationAnchorProperties,
  IUbirchVerificationConfig,
  IUbirchVerificationResponse,
  UbirchHashAlgorithm,
} from './models';
// assets
import './style.scss';

const LANGUAGE_MESSAGE_STRINGS = {
  de: MESSAGES_DE,
  en: MESSAGES_EN,
};

const DEFAULT_CONFIG: IUbirchVerificationConfig = {
  algorithm: 'sha512',
  accessToken: null,
  elementSelector: null,
};
const DEFAULT_FORM_CONFIG: IUbirchFormVerificationConfig = {
  algorithm: 'sha512',
  accessToken: null,
  elementSelector: null,
  formIds: [ 'created', 'name', 'workshop' ],
};
const VERSION = 'v2/';

let MESSAGE_STRINGS: any;
let HIGHLIGHT_PAGE_AFTER_VERIFICATION = false;

class UbirchVerification {
  protected debug = false;
  protected responseHandler: ResponseHandler = new ResponseHandler();
  protected view: View;
  protected elementSelector: string;
  private algorithm: UbirchHashAlgorithm;
  private accessToken: string;
  private openConsoleInSameTarget = false;
  private noLinkToConsole = false;

  constructor(config: IUbirchVerificationConfig = DEFAULT_CONFIG) {
    this.algorithm = config.algorithm;

    MESSAGE_STRINGS = config.language && LANGUAGE_MESSAGE_STRINGS[ config.language ] ?
      LANGUAGE_MESSAGE_STRINGS[ config.language ] : LANGUAGE_MESSAGE_STRINGS.de;

    if (config.HIGHLIGHT_PAGE_AFTER_VERIFICATION !== undefined) {
      HIGHLIGHT_PAGE_AFTER_VERIFICATION = config.HIGHLIGHT_PAGE_AFTER_VERIFICATION;
    }

    if (config.OPEN_CONSOLE_IN_SAME_TARGET) {
      this.openConsoleInSameTarget = config.OPEN_CONSOLE_IN_SAME_TARGET;
    }

    if (config.NO_LINK_TO_CONSOLE !== undefined) {
      this.noLinkToConsole = config.NO_LINK_TO_CONSOLE;
    }
    if (config.debug) {
      this.debug = config.debug;
    }

    if (!config.elementSelector) {
      this.handleError(EError.MISSING_PROPERTY_IN_UBRICH_VERIFICATION_INSTANCIATION);
    }
    this.elementSelector = config.elementSelector;

    try {
      this.view = new View(this.elementSelector, this.openConsoleInSameTarget);
    } catch (e) {
      if (e.message === EError.ELEMENT_FOR_WIDGET_SELECTOR_NOT_FOUND) {
        this.handleError(EError.ELEMENT_FOR_WIDGET_SELECTOR_NOT_FOUND);
      } else {
        throw e;
      }
    }

    if (!config.accessToken) {
      this.handleError(EError.MISSING_ACCESS_TOKEN);
    }

    this.accessToken = config.accessToken;
  }

  public setMessageString(key, info, headline?) {
    if (!MESSAGE_STRINGS[ key ]) {
      console.warn('Tried to set non existing message string with key ' + key);
    } else {
      MESSAGE_STRINGS[ key ].info = info;
      if (headline) {
        MESSAGE_STRINGS[ key ].headline = headline;
      }
    }
  }

  public verifyJSON(json: string, sort: boolean = true): void {
    const formattedJSON = this.formatJSON(json, sort);
    const hash = this.createHash(formattedJSON);

    this.verifyHash(hash);
  }

  public verifyHash(hash: string): void {
    this.sendVerificationRequest(hash);
  }

  public createHash(json: string): string {
    let transIdAB: ArrayBuffer;

    switch (this.algorithm) {
      case 'sha256': {
        transIdAB = sha256.arrayBuffer(json);
        break;
      }
      case 'sha512': {
        transIdAB = sha512.arrayBuffer(json);
        break;
      }
    }

    const transId: string = btoa(new Uint8Array(transIdAB).reduce((data, byte) => data + String.fromCharCode(byte), ''));

    return transId;
  }

  public formatJSON(json: string, sort: boolean = true): string {
    try {
      const object: object = JSON.parse(json);
      return JSON.stringify(sort ? this.sortObjectRecursive(object, sort) : object);
    } catch (e) {
      this.handleError(EError.JSON_MALFORMED);
    }
  }

  private handleInfo(info: EInfo, hash?: string): void {
    this.view.cleanupIcons();

    switch (info) {
      case EInfo.PROCESSING_VERIFICATION_CALL:
        this.view.addHeadlineAndInfotext(undefined);
        break;
      case EInfo.VERIFICATION_SUCCESSFUL:
        this.view.showSeal(true, hash, this.noLinkToConsole);
        this.view.addHeadlineAndInfotext(true);
        break;
    }
  }

  protected handleError(errorCode: EError, hash?: string, additionalErrorAttributes: any = {}): void {

    const errorMsg: string = this.responseHandler.getErrorMessageToCode(errorCode);

    let showNonSeal = true;

    if (errorCode === EError.NO_ERROR) {
      showNonSeal = false;
    }

    if (this.view && showNonSeal) {
      this.view.cleanupIcons();
      this.view.showSeal(false, hash, this.noLinkToConsole);
      this.view.addHeadlineAndInfotext(
        false,
        hash ? MESSAGE_STRINGS.FAIL.info : MESSAGE_STRINGS.VERIFICATION_NOT_POSSIBLE.info,
        errorMsg);
    }

    const err: IUbirchFormError = {
      message: errorMsg,
      code: errorCode,
      ...additionalErrorAttributes
    };

    this.logError(err.message);
    throw err;
  }

  private logError(errorStr: string): void {
    console.log(errorStr);
  }

  private sendVerificationRequest(hash: string): void {
    const xhttp: XMLHttpRequest = new XMLHttpRequest();
    const self = this;

    xhttp.onreadystatechange = function() {
      if (this.readyState < 4) {
        self.handleInfo(EInfo.PROCESSING_VERIFICATION_CALL);
      } else {
        switch (this.status) {
          case 200: {
            self.checkResponse(this.responseText, hash);
            break;
          }
          case 404: {
            self.handleError(EError.CERTIFICATE_ID_CANNOT_BE_FOUND, hash);
            break;
          }
          default: {
            self.handleError(EError.UNKNOWN_ERROR, hash);
            break;
          }
        }
      }
    };

    const verificationUrl = environment.verify_api_url + VERSION + 'upp/verify/record?response_form=anchors_with_path&blockchain_info=ext';

    xhttp.open('POST', verificationUrl, true);
    xhttp.setRequestHeader('Content-type', 'text/plain');
    xhttp.setRequestHeader('authorization', 'bearer ' + this.accessToken);
    xhttp.send(hash);
  }

  private checkResponse(result: string, hash: string): void {
    this.view.cleanupIcons();
    // Success IF
    // 1. HTTP Status 200 -> if this fkt is called and result isn't empty
    // 2. Key Seal != ''

    if (!result) {
      this.handleError(EError.VERIFICATION_FAILED_EMPTY_RESPONSE, hash);
      return;
    }

    const resultObj: IUbirchVerificationResponse = JSON.parse(result);

    if (!resultObj) {
      this.handleError(EError.VERIFICATION_FAILED_EMPTY_RESPONSE, hash);
      return;
    }

    const seal = resultObj.upp;

    if (!seal || !seal.length) {
      this.handleError(EError.VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE, hash);
      return;
    }

    this.handleInfo(EInfo.VERIFICATION_SUCCESSFUL, hash);

    const blockchainTX = resultObj.anchors.upper_blockchains;

    if (!blockchainTX || !blockchainTX.length) {
      return;
    }

    // add info text that blockchain icons are clickable
    this.view.showSuccess();

    // show it for each item in array
    blockchainTX.forEach((item, index) => {
      if (!item || !item.properties) {
        return;
      }

      this.view.showBloxTXIcon(item.properties, index);
    });
  }

  protected sortObjectRecursive(object: any, sort: boolean): object {
    // recursive termination condition
    if (typeof (object) !== 'object' || Array.isArray(object)) {
      return object;
    } else {
      const objectSorted: { [ key: string ]: any } = {};
      const keysOrdered: { [ key: string ]: any } = sort ? Object.keys(object).sort() : Object.keys(object);

      keysOrdered.forEach((key: string) => {
          const subObject: object = this.sortObjectRecursive(object[ key ], sort);
          objectSorted[ key ] = subObject;
        },
      );

      return objectSorted;
    }
  }
}

/**
 * special class for widget which is filled by a form
 */
class UbirchFormVerification extends UbirchVerification {

  private formIds: string[];
  private paramsFormIdsMapping: string[];
  private optionalFormFieldIds: string[];
  private allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&\'()*+,;=%';

  constructor(config: IUbirchFormVerificationConfig = DEFAULT_FORM_CONFIG) {

    super(config);

    if (!config.formIds) {
      this.handleError(EError.MISSING_PARAM_IDS);
    }
    this.formIds = config.formIds;
    if (config.paramsFormIdsMapping) {
      if (config.paramsFormIdsMapping.length !== this.formIds.length) {
        this.handleError(EError.PARAM_ID_MAPPING_MISSMATCH);
      }
      this.paramsFormIdsMapping = config.paramsFormIdsMapping;
    }
    if (config.CHECK_FORM_FILLED !== undefined && !config.CHECK_FORM_FILLED) {
      // all fields are optional if the form should not be checked
      this.optionalFormFieldIds = this.formIds;
    }
    this.optionalFormFieldIds = config.optionalFormFieldIds || [];
  }

  /**
   * get params of form fields as string from fragment OR - if no fragment set - from query of url
   * @param windowRef Reference to window
   */
  public getFormParamsFromUrl(windowRef): string {

    const hash = this.handleFragment(windowRef);

    return hash ? hash : this.handleQuery(windowRef);
  }

  /**
   * put params into form fields
   * @param dataP string that contains field params in a form like:
   *    pid=9ceb5551-d006-4648-8cf7-c7b1a1ddccb1&tid=FGXC-CL11-KDKC-P9XC-74MM&td=2020-06-12&tt=11:00:00&tr=negativ
   * @param documentRef Reference to document
   * @param separatorP optional param to define paramString separator e.g. when params are read from fragment;
   * the whole string is searched in the paramStr, so you can e.g. define "%SEP%" as the separator between params;
   * default is "&" which is the normal separator for query params
   * @param arraySeparatorP optional param to define custom separator to divide array ellements given in the url query or fragment;
   * default is "," but this can lead into problems if normal text - possibly containing commas - has been anchored
   */
  public setDataIntoForm(dataP, documentRef, separatorP?, arraySeparatorP?) {

    try {
      const separator = separatorP || '&';
      const arraySeparator = arraySeparatorP || ',';

      const allParams = dataP.split(separator).map((dataset: string) => {
        const data = dataset.split('=');

        return {
          key: data[ 0 ],
          value: this.handleUrlParamValue(data[ 1 ], arraySeparator),
        };
      });

      allParams.forEach(param => {
        if (param.key) {
          let key = param.key;
          if (this.paramsFormIdsMapping && this.paramsFormIdsMapping.length > 0) {
            const idIndex = this.paramsFormIdsMapping.indexOf(key);
            if (idIndex < 0) {
              console.warn('No mapping defined for ' + key);
            } else {
              key = this.formIds[ idIndex ];
            }
          }
          if (Array.isArray(param.value)) {
            param.value.forEach((value, index) => {
              const keyStr = `${key}_${index}`;
              if (documentRef.getElementById(keyStr) && documentRef.getElementById(keyStr) !== null) {
                documentRef.getElementById(keyStr).value = value;
              }
            });
          } else {
            if (documentRef.getElementById(key) && documentRef.getElementById(key) !== null) {
              documentRef.getElementById(key).value = param.value;
            }
          }
        }
      });
    } catch (e) {
      const err: IUbirchFormError = {
        message: e.message,
        code: EError.FILLING_FORM_WITH_PARAMS_FAILED,
      };
      throw err;
    }
  }

  /**
   * Creates JSON certificate from form fields if form is filled completely
   * @param documentRef Reference to document
   */
  public getJsonFromInputs(documentRef): string {
    try {
      const idsOfMissingFormFieldValues = [];

      this.formIds.forEach((formId, index) => {
        if (!this.check(index, documentRef)) {
          idsOfMissingFormFieldValues.push(formId);
        }
      });

      if (idsOfMissingFormFieldValues.length > 0) {
        const errAttributes: any = {
          missingIds: idsOfMissingFormFieldValues,
        };
        this.handleError(EError.MANDATORY_FIELD_MISSING, undefined, errAttributes);
      }

      // helper to generate correct JSON from input fields
      // attention: ids of input fields have to be same as field names in anchored JSON
      const genJson = this.createJsonFromInputs(this.formIds, documentRef);
      return genJson;
    } catch (e) {
      if ( e.code === EError.MANDATORY_FIELD_MISSING ) {
        throw e;
      }
      this.handleError(EError.FILLING_FORM_WITH_PARAMS_FAILED);
    }
  }

  public createJsonFromInputs(labels, documentRef) {
    try {
      const objectFromInputFields: any = {};
      labels.forEach((label, index) => {
        const strOrArrayValue = this.getObjectFromInputFields(label, documentRef);
        if (strOrArrayValue) {
          objectFromInputFields[label] = strOrArrayValue;
        }
      });

      const certJson = JSON.stringify(this.sortObjectRecursive(objectFromInputFields, true));

      if (this.debug) {
        console.log('certificate: ' + certJson);
      }

      return certJson;
    } catch (e) {
      if (e.code === EError.CANNOT_ACCESS_FORM_FIELD) {
        throw e;
      }
      this.handleError(EError.JSON_MALFORMED);
    }
  }

  public sanitizeUrlAndQuery(urlStr: string) {

    const foundNotAllowedChars: string[] = [ ...urlStr ].filter(char => !this.allowedCharacters.includes(char));
    const uniqueFoundNotAllowedChars = [...new Set(foundNotAllowedChars)];

    if (uniqueFoundNotAllowedChars.length > 0) {
      const errAttributes: any = {
        notAllowedChars: uniqueFoundNotAllowedChars,
      };
      this.handleError(EError.URL_PARAMS_CORRUPT, undefined, errAttributes);
    }

    return urlStr;
  }

  private handleFragment(windowRef): string {
    let hash;
    try {
      hash = windowRef.location.hash;
    } catch (e) {
      this.handleError(EError.LOCATION_MALFORMED);
    }

    return hash ? this.sanitizeUrlAndQuery(hash.slice(1)) : undefined;
  }

  private handleQuery(windowRef): string {
    let query;
    try {
      query = windowRef.location.search;
    } catch (e) {
      this.handleError(EError.LOCATION_MALFORMED);
    }

    return query.length > 0 ? this.sanitizeUrlAndQuery(query.substr(1)) : undefined;
  }

  private getObjectFromInputFields(inputId, documentRef): string | string[] {
    if (documentRef.getElementById(inputId) && documentRef.getElementById(inputId).value) {
      return this.extractElementValue(inputId, documentRef);
    } else {
      const probablyAnArray = this.getInputArray(inputId, documentRef);
      if (probablyAnArray !== undefined) {
        return probablyAnArray;
      } else {
        console.warn('Missing documentElement with id ' + inputId);
        return undefined;
      }
    }
  }

  private extractElementValue(inputId, documentRef) {
    try {
      return documentRef.getElementById(inputId).value;
    } catch (e) {
      const err: IUbirchFormError = {
        message: 'Unable to access input with id ' + inputId,
        code: EError.CANNOT_ACCESS_FORM_FIELD,
      };
      throw err;
    }
  }

  private getInputArray(inputId, documentRef): string[] {
    const inputArray = [];
    let index = 0;
    let arrayElementId = `${inputId}_${index}`;
    while (documentRef.getElementById(arrayElementId)) {
      inputArray.push(this.extractElementValue(arrayElementId, documentRef));
      index++;
      arrayElementId = `${inputId}_${index}`;
    }
    if (index > 0) {
      return inputArray;
    } else {
      // no array found -> id is missing
      return undefined;
    }
  }

  private handleUrlParamValue(val: string, arraySeparator: string): any {
    try {
      if (val.includes(arraySeparator)) {
        const arrayVal = val.split(arraySeparator).map(item => decodeURIComponent(item));
        return arrayVal;
      } else {
        return decodeURIComponent(val);
      }
    } catch (e) {
      this.handleError(EError.URL_PARAMS_CORRUPT);
    }
  }

  // helper to check that ubirchVerification instance is initialized and required input field are set
  private check(index, documentRef) {
    if (this.formIds && this.formIds.length > index) {

      const elemId = this.formIds[ index ];

      // optional parameter?
      if (this.optionalFormFieldIds.includes(elemId)) {
        return true;
      }

      if (documentRef.getElementById(elemId)?.value !== undefined &&
        documentRef.getElementById(elemId).value !== '') {
        return true;
      }

      // is Array? check for existence of first element
      const arrayId = elemId + '_0';
      if (documentRef.getElementById(arrayId)?.value !== undefined) {
        return true;
      }
    }
    return false;
  }

}

class ResponseHandler {
  getErrorMessageToCode(errorCode: EError): string {
    return MESSAGE_STRINGS[errorCode]?.info || MESSAGE_STRINGS.UNKNOWN_ERROR.info;
    }
}

class View {
  private host: HTMLElement;
  private sealInfoText: HTMLElement = document.createElement('div');
  private sealOutput: HTMLElement = document.createElement('div');
  private resultOutput: HTMLElement = document.createElement('div');
  private errorOutput: HTMLElement = document.createElement('div');
  private openConsoleInSameTarget = false;

  constructor(
    private elementSelectorP,
    private openConsoleInSameTargetP) {
    const host: HTMLElement = document.querySelector(this.elementSelectorP);
    this.openConsoleInSameTarget = openConsoleInSameTargetP;

    if (!host) {
      throw new Error(EError.ELEMENT_FOR_WIDGET_SELECTOR_NOT_FOUND);
    }

    this.host = host;

    this.sealInfoText.classList.add('ubirch-info-text');
    this.sealOutput.classList.add('ubirch-seal-output');
    this.resultOutput.classList.add('ubirch-result-output');
    this.errorOutput.classList.add('ubirch-error-output');

    this.host.appendChild(this.sealInfoText);
    this.host.appendChild(this.sealOutput);
    this.host.appendChild(this.resultOutput);
    this.host.appendChild(this.errorOutput);
  }

  public cleanupIcons(): void {
    // remove seal and transaction_check icons IF exist
    this.cleanAllChilds(this.resultOutput);
    this.cleanAllChilds(this.sealOutput);
    this.cleanAllChilds(this.sealInfoText);
  }

  public showSeal(successful: boolean, hash: string, nolink: boolean = false): void {
    let icon: HTMLElement;

    if (successful) {
      icon = this.createIconTag(environment.assets_url_prefix + BlockchainSettings.ubirchIcons.seal,
        'ubirch-verification-seal-img');
    } else {
      icon = this.createIconTag(environment.assets_url_prefix + BlockchainSettings.ubirchIcons.no_seal,
        'ubirch-verification-no-seal-img');
    }

    if (nolink) {
      this.sealOutput.appendChild(icon);
    } else {
      const link: HTMLElement = document.createElement('a');

      const encodedHash: string = encodeURIComponent(hash);

      link.setAttribute('href', `${environment.console_verify_url}?hash=${encodedHash}`);
      if (!this.openConsoleInSameTarget) {
        link.setAttribute('target', '_blank');
      }

      link.appendChild(icon);

      this.sealOutput.appendChild(link);
    }
  }

  public showSuccess(): void {
    this.resultOutput.innerHTML = '';
    this.errorOutput.innerHTML = '';

    this.resultOutput.appendChild(document.createElement('br'));
    this.resultOutput.appendChild(this.createTxtTag(MESSAGE_STRINGS.SUCCESS.info, 'ubirch-verification-success'));
    this.resultOutput.appendChild(document.createElement('br'));
  }

  public showBloxTXIcon(bloxTX: IUbirchVerificationAnchorProperties, index: number): void {
    if (!bloxTX) {
      return;
    }

    const blockchain: string = bloxTX.blockchain;
    const networkType: string = bloxTX.network_type;

    if (!blockchain || !networkType) {
      return;
    }

    const blox: IUbirchBlockchain =
      BlockchainSettings.blockchainSettings ? BlockchainSettings.blockchainSettings[ blockchain ] : undefined;

    if (!blox || !bloxTX.txid) {
      return;
    }

    const bloxTXData: IUbirchBlockchainNet =
      blox.explorerUrl[ networkType ];

    const linkTag: HTMLElement = document.createElement('a');

    // add transactionId to url
    if (bloxTXData.url) {
      linkTag.setAttribute('href', bloxTXData.url + bloxTX.txid);
    }

    const titleStr: string = bloxTX.network_info ? bloxTX.network_info : bloxTX.blockchain;

    linkTag.setAttribute('title', titleStr);
    linkTag.setAttribute('target', '_blanc');

    // if icon url is given add img, otherwise add text
    if (blox.nodeIcon) {
      const iconId = `blockchain_transid_check${index === undefined ? '' : '_' + index}`;
      linkTag.appendChild(this.createIconTag(environment.assets_url_prefix + blox.nodeIcon, iconId));
    } else {
      linkTag.innerHTML = titleStr;
    }

    this.resultOutput.appendChild(linkTag);
  }

  public addHeadlineAndInfotext(successful: true | false | undefined, info?: string, errorMsg?: string): void {
    if (successful === undefined) {
      this.resultOutput.appendChild(this.createTxtTag(MESSAGE_STRINGS.PENDING.info, 'ubirch-verification-info'));
    } else {
      if (successful) {
        this.sealInfoText.appendChild(this.createTxtTag(MESSAGE_STRINGS.SUCCESS.headline,
          'ubirch-verification-success ubirch-verification-headline'));
      } else {
        this.sealInfoText.appendChild(this.createTxtTag(MESSAGE_STRINGS.FAIL.headline,
          'ubirch-verification-fail ubirch-verification-headline'));
        this.resultOutput.appendChild(this.createTxtTag(info ? info : MESSAGE_STRINGS.FAIL.info,
          'ubirch-verification-fail'));
        if (errorMsg) {
          this.errorOutput.appendChild(this.createTxtTag(errorMsg,
            'ubirch-error-output'));
        }
      }
      // if HIGHLIGHT_PAGE_AFTER_VERIFICATION is set the whole page is flashed in green, if verification returned successful,
      // or red, if verification failed
      this.highlightPage(successful);
    }
  }

  public createTxtTag(txt: string, className: string): HTMLElement {
    const txtTag: HTMLElement = document.createElement('div');
    txtTag.innerHTML = txt;
    txtTag.setAttribute('class', className);

    return txtTag;
  }

  private cleanAllChilds(element: HTMLElement): void {
    if (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  }

  private createIconTag(src: string, imgTagId: string, width?: string, height?: string): HTMLElement {
    const imgTag: HTMLElement = document.createElement('img');
    imgTag.setAttribute('width', width ? width : '50');
    imgTag.setAttribute('height', height ? height : '50');
    imgTag.setAttribute('src', src);

    if (imgTagId) {
      imgTag.setAttribute('id', imgTagId);
    }
    return imgTag;
  }

  private highlightPage(successful: boolean) {
    if (HIGHLIGHT_PAGE_AFTER_VERIFICATION) {
      const highlightClass = successful ? 'flashgreen' : 'flashred';
      const mainElement = document.getElementsByTagName('main')[ 0 ];
      setTimeout(_ => {
        mainElement.classList.toggle(highlightClass);
      }, 100);
      setTimeout(_ => {
        mainElement.classList.toggle(highlightClass);
      }, 2400);

    }
  }
}

window[ 'UbirchVerification' ] = UbirchVerification;
window[ 'UbirchFormVerification' ] = UbirchFormVerification;
