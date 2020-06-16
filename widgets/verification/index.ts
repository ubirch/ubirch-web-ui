import {sha256} from 'js-sha256';
import {sha512} from 'js-sha512';
import {
  EError,
  EInfo,
  IUbirchBlockchainNet,
  IUbirchVerificationAnchorProperties,
  IUbirchVerificationConfig,
  IUbirchVerificationResponse,
  UbirchHashAlgorithm
} from './models';
import environment from './environment.dev';
// assets
import './style.scss';
import '../../src/assets/app-icons/Ethereum_verify_right.png';
import '../../src/assets/app-icons/Ethereum-Classic_verify_right.png';
import '../../src/assets/app-icons/IOTA_verify_right.png';
import '../../src/assets/app-icons/GovDigital_Icon_verify_right.png';
import '../../src/assets/app-icons/ubirch_verify_right.png';
import '../../src/assets/app-icons/ubirch_verify_wrong.png';

const MESSAGE_STRINGS = {
  PENDING: {
    info: '...Verifikation wird durchgeführt....'
  },
  SUCCESS: {
    headline: 'Verifikation erfolgreich!',
    info: 'Für zusätzliche Informationen zur Verankerung klicken Sie auf das Icon der jeweiligen Blockchain:'
  },
  FAIL: {
    headline: 'Verifikation fehlgeschlagen!',
    info: 'Zu den eingegebenen Daten gibt es keine Blockchain-Verankerung'
  },
  CERTIFICATE_DATA_MISSING: {
    info: 'Zertifikatsdaten fehlen - bitte füllen Sie das Formular aus oder scannen Sie Ihren QR-Code!!!'
  },
  VERIFICATION_FAILED: {
    info: 'Verifikation fehlgeschlagen!'
  },
  CERTIFICATE_ID_CANNOT_BE_FOUND: {
    info: 'Zertifikat konnte nicht gefunden werden!!!!!'
  },
  VERIFICATION_FAILED_EMPTY_RESPONSE: {
    info: 'Verifikation fehlgeschlagen!! Zertifikat ist leer oder enthält kein Siegel'
  },
  VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE: {
    info: 'Verifikation fehlgeschlagen!! Zertifikat ist leer oder enthält kein Siegel'
  },
  UNKNOWN_ERROR: {
    info: 'Problem!!! Ein unerwarteter Fehler ist aufgetreten....!'
  }
};

const DEFAULT_CONFIG: IUbirchVerificationConfig = {
  algorithm: 'sha512',
  elementSelector: null
};

class UbirchVerification {
  private responseHandler: ResponseHandler = new ResponseHandler();
  private view: View;
  private algorithm: UbirchHashAlgorithm;
  private elementSelector: string;

  constructor(config: IUbirchVerificationConfig = DEFAULT_CONFIG) {
    if (!config.elementSelector) {
      throw new Error('Please, provide the `elementSelector` to UbirchVerification config');
    }

    this.algorithm = config.algorithm;
    this.elementSelector = config.elementSelector;

    this.view = new View(this.elementSelector);
  }

  public setMessageString(key, info, headline?) {
    if (!MESSAGE_STRINGS[key]) {
      console.warn('Tried to set non existing message string with key ' + key);
    } else {
      MESSAGE_STRINGS[key].info = info;
      if (headline) {
        MESSAGE_STRINGS[key].headline = headline;
      }
    }
  }

  public createCertificate(labels, documentRef) {
    let allParamsSet = true;
    labels.forEach(label => {
      if (!documentRef.getElementById(label) || !documentRef.getElementById(label).value) {
        allParamsSet = false;
      }
    });
    if (!allParamsSet) {
      return undefined;
    }

    let certJson = '{';
    labels.forEach((label, index) => {
      certJson += index > 0 ? ',' : '';
      certJson += '"' + label + '":"' + this.getInputStr(label, documentRef) + '"';
    });
    certJson += '}';

    console.log('certificate: ' + certJson);

    return certJson;
  }

  public verifyJSON(json: string): void {
    const formattedJSON = this.formatJSON(json);
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

  private getInputStr(inputId, documentRef) {
    if (documentRef.getElementById(inputId) +
      documentRef.getElementById(inputId).value) {
      const doc = new
      DOMParser().parseFromString(documentRef.getElementById(inputId).value,
        'text/html');
      return doc.documentElement.textContent;
    } else {
      console.warn('Missing documentElement with id ' + inputId);
      return '';
    }
  }

  private handleInfo(info: EInfo, hash?: string): void {
    this.view.cleanupIcons();

    switch (info) {
      case EInfo.PROCESSING_VERIFICATION_CALL:
        this.view.addHeadlineAndInfotext(undefined);
        break;
      case EInfo.VERIFICATION_SUCCESSFUL:
        this.view.showSeal(true, hash);
        this.view.addHeadlineAndInfotext(true);
        break;
    }
  }

  private handleError(error: EError, hash: string): void {
    let showNonSeal = true;

    if (error === EError.NO_ERROR) {
      showNonSeal = false;
    }

    if (showNonSeal) {
      this.view.cleanupIcons();
      this.view.showSeal(false, hash);
      this.view.addHeadlineAndInfotext(false);
    }

    logError(this.responseHandler.handleError(error));
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

    xhttp.open('POST', environment.verify_api_url, true);
    xhttp.setRequestHeader('Content-type', 'text/plain');
    xhttp.send(hash);
  }

  private checkResponse(result: string, hash: string): void {
    this.view.cleanupIcons();
    // Success IF
    // 1. HTTP Status 200 -> if this fkt is called and result isn't empty
    // 2. Key Seal != ''

    if (!result) {
      this.view.showError(EError.VERIFICATION_FAILED_EMPTY_RESPONSE);
      return;
    }

    const resultObj: IUbirchVerificationResponse = JSON.parse(result);

    if (!resultObj) {
      this.view.showError(EError.VERIFICATION_FAILED_EMPTY_RESPONSE);
      return;
    }

    const seal = resultObj.upp;

    if (!seal || !seal.length) {
      this.view.showError(EError.VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE);
      return;
    }

    this.handleInfo(EInfo.VERIFICATION_SUCCESSFUL, hash);

    const blockchainTX = resultObj.anchors;

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

  private formatJSON(json: string): string {
    const object: object = JSON.parse(json);
    const objectSorted: { [key: string]: any } = {};

    const keysSorted = Object.keys(object).sort();
    keysSorted.forEach(key => objectSorted[key] = object[key]);

    return JSON.stringify(objectSorted);
  }
}

class ResponseHandler {
  handleError(error: EError): string {
    switch (error) {
      case EError.CERTIFICATE_DATA_MISSING:
        return MESSAGE_STRINGS.CERTIFICATE_DATA_MISSING.info;
      case EError.VERIFICATION_FAILED:
        return MESSAGE_STRINGS.VERIFICATION_FAILED.info;
      case EError.CERTIFICATE_ID_CANNOT_BE_FOUND:
        return MESSAGE_STRINGS.CERTIFICATE_ID_CANNOT_BE_FOUND.info;
      case EError.VERIFICATION_FAILED_EMPTY_RESPONSE:
        return MESSAGE_STRINGS.VERIFICATION_FAILED_EMPTY_RESPONSE.info;
      case EError.VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE:
        return MESSAGE_STRINGS.VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE.info;
      case EError.UNKNOWN_ERROR:
      default:
        return MESSAGE_STRINGS.UNKNOWN_ERROR.info;
    }
  }
}

class View {
  private host: HTMLElement;
  private sealInfoText: HTMLElement = document.createElement('div');
  private sealOutput: HTMLElement = document.createElement('div');
  private resultOutput: HTMLElement = document.createElement('div');
  private errorOutput: HTMLElement = document.createElement('div');

  constructor(private elementSelector) {
    const host: HTMLElement = document.querySelector(this.elementSelector);

    if (!host) {
      throw new Error(`Element by selector '${this.elementSelector}' not found`);
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

  public showError(error: any): void {
    this.errorOutput.innerHTML = '';
    this.resultOutput.innerHTML = error;
  }

  public cleanupIcons(): void {
    // remove seal and transaction_check icons IF exist
    this.cleanAllChilds(this.resultOutput);
    this.cleanAllChilds(this.sealOutput);
    this.cleanAllChilds(this.sealInfoText);
  }

  public showSeal(successful: boolean, hash: string): void {
    const link: HTMLElement = document.createElement('a');
    let icon: HTMLElement;

    const encodedHash: string = encodeURIComponent(hash);

    link.setAttribute('href', `${environment.console_verify_url}?hash=${encodedHash}`);
    link.setAttribute('target', '_blank');

    if (successful) {
      icon = this.createIconTag(environment.assets_url_prefix + environment.seal_icon_url, 'ubirch-verification-seal-img');
    } else {
      icon = this.createIconTag(environment.assets_url_prefix + environment.no_seal_icon_url, 'ubirch-verification-no-seal-img');
    }

    link.appendChild(icon);
    this.sealOutput.appendChild(link);
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

    const bloxTXData: IUbirchBlockchainNet =
      ((environment || {} as any).blockchain_transid_check_url[blockchain] || {} as any)[networkType];

    if (!bloxTXData || !bloxTX.txid) {
      return;
    }

    const linkTag: HTMLElement = document.createElement('a');

    // add transactionId to url
    if (bloxTXData.url) {
      linkTag.setAttribute('href', bloxTXData.url + bloxTX.txid);
    }

    const titleStr: string = bloxTX.network_info ? bloxTX.network_info : bloxTX.blockchain;

    linkTag.setAttribute('title', titleStr);
    linkTag.setAttribute('target', '_blanc');

    // if icon url is given add img, otherwise add text
    if (bloxTXData.icon_url) {
      const iconId = `blockchain_transid_check${index === undefined ? '' : '_' + index}`;
      linkTag.appendChild(this.createIconTag(environment.assets_url_prefix + bloxTXData.icon_url, iconId));
    } else {
      linkTag.innerHTML = titleStr;
    }

    this.resultOutput.appendChild(linkTag);
  }

  public addHeadlineAndInfotext(successful: true | false | undefined): void {
    if (successful === undefined) {
      this.resultOutput.appendChild(this.createTxtTag(MESSAGE_STRINGS.PENDING.info, 'ubirch-verification-info'));
    } else {
      if (successful) {
        this.sealInfoText.appendChild(this.createTxtTag(MESSAGE_STRINGS.SUCCESS.headline,
          'ubirch-verification-success ubirch-verification-headline'));
      } else {
        this.sealInfoText.appendChild(this.createTxtTag(MESSAGE_STRINGS.FAIL.headline,
          'ubirch-verification-fail ubirch-verification-headline'));
        this.resultOutput.appendChild(this.createTxtTag(MESSAGE_STRINGS.FAIL.info,
          'ubirch-verification-fail'));
      }
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
}

function logError(errorStr: string): void {
  console.log(errorStr);
}

window['UbirchVerification'] = UbirchVerification;
