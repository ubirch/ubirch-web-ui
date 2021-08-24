import * as BlockchainSettings from '../../resources/blockchain-settings.json';
import '../../src/assets/app-icons/bloxberg_verify_right.png';
import '../../src/assets/app-icons/Ethereum-Classic_verify_right.png';
import '../../src/assets/app-icons/Ethereum_verify_right.png';
import '../../src/assets/app-icons/GovDigital_Icon_verify_right.png';
import '../../src/assets/app-icons/IOTA_verify_right.png';
import '../../src/assets/app-icons/ubirch_verify_right.png';
import '../../src/assets/app-icons/ubirch_verify_wrong.png';
import environment from './environment.dev';
import {
  EError,
  IUbirchFormVerificationConfig,
  IUbirchVerificationConfig,
} from './models';
// assets
import './style.scss';

const LANGUAGE_MESSAGE_STRINGS = {
  de: {
    DEACTIVATED: {
      headline: 'Verifikation kann nicht durchgeführt werden!',
      info: 'ACHTUNG!!! Dieses Modul ist nicht mehr verfügbar. Bitte informieren Sie den Administrator dieser Seite oder App darüber, ' +
        'stattdessen das npm package ubirch-verification-js zu verwenden. (https://www.npmjs.com/package/@ubirch/ubirch-verification-js)',
    },
  },
  en: {
    DEACTIVATED: {
      headline: 'Verification cannot be processed!',
      info: 'ATTENTION!!! This module is no longer provided. Please tell the administrator of this website of app to use the npm package' +
        'ubirch-verification-js instead. (https://www.npmjs.com/package/@ubirch/ubirch-verification-js)',
    },
  },
};

const DEFAULT_CONFIG: IUbirchVerificationConfig = {
  algorithm: 'sha512',
  elementSelector: null,
};
const DEFAULT_FORM_CONFIG: IUbirchFormVerificationConfig = {
  algorithm: 'sha512',
  elementSelector: null,
  formIds: [ ],
};

let MESSAGE_STRINGS: any;

class UbirchVerification {
  private responseHandler: ResponseHandler = new ResponseHandler();
  private view: View;
  private elementSelector: string;
  private openConsoleInSameTarget = false;

  constructor(config: IUbirchVerificationConfig = DEFAULT_CONFIG) {
    MESSAGE_STRINGS = config.language && LANGUAGE_MESSAGE_STRINGS[ config.language ] ?
      LANGUAGE_MESSAGE_STRINGS[ config.language ] : LANGUAGE_MESSAGE_STRINGS.de;

    if (!config.elementSelector) {
      throw new Error(MESSAGE_STRINGS.DEACTIVATED.info);
    }

    this.elementSelector = config.elementSelector;

    this.view = new View(this.elementSelector, this.openConsoleInSameTarget);

    this.showDeactivatedInfo();
  }

  public verifyHash(hash: string): void {
    this.showDeactivatedInfo();
  }

  private showDeactivatedInfo(): void {
    this.handleDeactivated();
    alert(MESSAGE_STRINGS.DEACTIVATED.info);
  }

  public createHash(json: string): string {
    this.showDeactivatedInfo();
    return '';
  }

  public formatJSON(json: string, sort: boolean = true): string {
    this.showDeactivatedInfo();
    return '';
  }

  private handleDeactivated(): void {
    this.view.cleanupIcons();
    this.view.showDeactivated();
    this.view.addDeactivatedHeadlineAndInfotext();

    logError(this.responseHandler.handleError(EError.DEACTIVATED));
  }
}

/**
 * special class for widget which is filled by a form
 */
class UbirchFormVerification extends UbirchVerification {
  private formIds: string[];

  constructor(config: IUbirchFormVerificationConfig = DEFAULT_FORM_CONFIG) {
    super(config);
  }

  public getFormParamsFromUrl(windowRef): string {
    return undefined;
  }

  public setDataIntoForm(dataP, documentRef, separatorP?, arraySeparatorP?) {
  }

  /**
   * Creates JSON certificate from form fields if form is filled completely
   * @param documentRef Reference to document
   */
  public getJsonFromInputs(documentRef): string {
    return '';
  }

  public createJsonFromInputs(labels, documentRef) {
    return '';
  }
}

class ResponseHandler {
  handleError(error: EError): string {
    switch (error) {
      case EError.DEACTIVATED:
        return MESSAGE_STRINGS.DEACTIVATED.info;
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
  private openConsoleInSameTarget = false;

  constructor(
    private elementSelectorP,
    private openConsoleInSameTargetP) {
    const host: HTMLElement = document.querySelector(this.elementSelectorP);
    this.openConsoleInSameTarget = openConsoleInSameTargetP;

    if (!host) {
      throw new Error(`Element by selector '${this.elementSelectorP}' not found`);
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

function logError(errorStr: string): void {
  console.log(errorStr);
}

window[ 'UbirchVerification' ] = UbirchVerification;
window[ 'UbirchFormVerification' ] = UbirchFormVerification;
