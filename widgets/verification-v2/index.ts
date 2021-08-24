import * as BlockchainSettings from '../../resources/blockchain-settings.json';
import '../../src/assets/app-icons/alert-circle-red.svg';
import '../../src/assets/app-icons/bloxberg_verify_right.png';
import '../../src/assets/app-icons/Ethereum-Classic_verify_right.png';
import '../../src/assets/app-icons/Ethereum_verify_right.png';
import '../../src/assets/app-icons/GovDigital_Icon_verify_right.png';
import '../../src/assets/app-icons/IOTA_verify_right.png';
import '../../src/assets/app-icons/ubirch_verify_right.png';
import '../../src/assets/app-icons/ubirch_verify_wrong.png';
import '../../src/assets/app-icons/ubirch_verify_notyet.png';
import environment from './environment.dev';
import { MESSAGES_DE } from './messages.de';
import { MESSAGES_EN } from './messages.en';
import {
  EError,
  IUbirchFormVerificationConfig,
  IUbirchVerificationConfig,
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
  formIds: [ ],
};

let MESSAGE_STRINGS: any;

class UbirchVerification {
  protected debug = false;
  protected responseHandler: ResponseHandler = new ResponseHandler();
  protected view: View;
  protected elementSelector: string;

  constructor(config: IUbirchVerificationConfig = DEFAULT_CONFIG) {
    MESSAGE_STRINGS = config.language && LANGUAGE_MESSAGE_STRINGS[ config.language ] ?
      LANGUAGE_MESSAGE_STRINGS[ config.language ] : LANGUAGE_MESSAGE_STRINGS.de;

    this.debug = true;

    if (!config.elementSelector) {
      alert(MESSAGE_STRINGS.DEACTIVATED.info);
    }
    this.elementSelector = config.elementSelector;

    try {
      this.view = new View(this.elementSelector, true);
    } catch (e) {
      alert(MESSAGE_STRINGS.DEACTIVATED.info);
    }
    this.showDeactivatedInfo();
  }

  private showDeactivatedInfo(): void {
    this.handleDeactivated();
    alert(MESSAGE_STRINGS.DEACTIVATED.info);
  }

  private handleDeactivated(): void {
    this.view.cleanupIcons();
    this.view.showDeactivated();
    this.view.addDeactivatedHeadlineAndInfotext();
  }

  public setMessageString(key, info, headline?) {
  }

  public verifyJSON(json: string, sort: boolean = true): void {
    this.verifyHash('');
  }

  public verifyHash(hash: string): void {
    this.showDeactivatedInfo();
  }

  public createHash(json: string): string {
    alert(MESSAGE_STRINGS.DEACTIVATED.info);
    return '';
  }

  public formatJSON(json: string, sort: boolean = true): string {
    alert(MESSAGE_STRINGS.DEACTIVATED.info);
    return '';
  }
}

/**
 * special class for widget which is filled by a form
 */
class UbirchFormVerification extends UbirchVerification {

  constructor(config: IUbirchFormVerificationConfig = DEFAULT_FORM_CONFIG) {
    super(config);
  }

  public getFormParamsFromUrl(windowRef): string {
    alert(MESSAGE_STRINGS.DEACTIVATED.info);
    return '';
  }

  public setDataIntoForm(dataP, documentRef, separatorP?, arraySeparatorP?) {
    alert(MESSAGE_STRINGS.DEACTIVATED.info);
    return '';
  }

  public getJsonFromInputs(documentRef): string {
    alert(MESSAGE_STRINGS.DEACTIVATED.info);
    return '';
  }

  public createJsonFromInputs(labels, documentRef) {
    alert(MESSAGE_STRINGS.DEACTIVATED.info);
    return '';
  }

  public sanitizeUrlAndQuery(urlStr: string) {
    alert(MESSAGE_STRINGS.DEACTIVATED.info);
    return '';
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
      throw new Error(EError.DEACTIVATED);
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

  public showDeactivated(): void {
    let icon: HTMLElement;
    icon = this.createIconTag(environment.assets_url_prefix + BlockchainSettings.ubirchIcons.no_seal,
      'ubirch-verification-no-seal-img');
    this.sealOutput.appendChild(icon);
  }

  public addDeactivatedHeadlineAndInfotext(): void {
    this.sealInfoText.appendChild(this.createTxtTag(MESSAGE_STRINGS.DEACTIVATED.headline,
      'ubirch-verification-fail ubirch-verification-headline'));
    this.resultOutput.appendChild(this.createTxtTag(MESSAGE_STRINGS.DEACTIVATED.info,
      'ubirch-verification-fail'));
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

window[ 'UbirchVerification' ] = UbirchVerification;
window[ 'UbirchFormVerification' ] = UbirchFormVerification;
