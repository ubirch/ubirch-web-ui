import { sha256 } from 'js-sha256';
import { sha512 } from 'js-sha512';
import {
    UbirchHashAlgorithm,
    IUbirchVerificationConfig,
    EInfo,
    EError,
    IUbirchVerificationResponse,
    IUbirchVerificationAnchorProperties,
    IUbirchBlockchainNet
} from './models';
import environment from './environment';

const INFO_TEXTS = {
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

    private createHash(json: string): string {
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

        let transId: string = btoa(new Uint8Array(transIdAB).reduce((data, byte) => data + String.fromCharCode(byte), ''));

        return transId;
    }

    public verifyJSON(json: string): void {
        const formattedJSON = this.formatJSON(json);
        const hash = this.createHash(formattedJSON);

        this.verifyHash(hash);
    }

    public verifyHash(hash: string): void {
        this.sendVerificationRequest(hash);
    }

    private handleInfo(info: EInfo) {
        this.view.cleanupIcons();

        switch (info) {
            case EInfo.PROCESSING_VERIFICATION_CALL:
                this.view.addHeadlineAndInfotext(undefined);
                break;
            case EInfo.VERIFICATION_SUCCESSFUL:
                this.view.showSeal(true);
                this.view.addHeadlineAndInfotext(true);
                break;
        }
    }

    private handleError(error: EError): void {
        let showNonSeal = true;

        if (error === EError.NO_ERROR) {
            showNonSeal = false;
        }

        if (showNonSeal) {
            this.view.cleanupIcons();
            this.view.showSeal(false);
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
                        self.checkResponse(this.responseText);
                        break;
                    }
                    case 404: {
                        self.handleError(EError.CERTIFICATE_ID_CANNOT_BE_FOUND);
                        break;
                    }
                    default: {
                        self.handleError(EError.UNKNOWN_ERROR);
                        break;
                    }
                }
            }
        };

        xhttp.open('POST', environment.verify_api_url, true);
        xhttp.setRequestHeader('Content-type', 'text/plain');
        xhttp.send(hash);
    }

    private checkResponse(result: string): void {
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

        this.handleInfo(EInfo.VERIFICATION_SUCCESSFUL);

        let blockchainTX = resultObj.anchors;

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
        const objectSorted: { [key:string]: any } = {};

        const keysSorted = Object.keys(object).sort();
        keysSorted.forEach(key => objectSorted[key] = object[key]);

        return JSON.stringify(objectSorted);
    }
}

class ResponseHandler {
    handleInfo(info): string {
        switch (info) {
            case EInfo.PROCESSING_VERIFICATION_CALL: {
                return '...processing....';
            }
            case EInfo.VERIFICATION_SUCCESSFUL: {
                return '';
            }
        }
    }

    handleError(error: EError): string {
        switch (error) {
            case EError.CERTIFICATE_DATA_MISSING:
                return "Zertifikatsdaten fehlen - bitte füllen Sie das Formular aus oder scannen Sie Ihren QR-Code!!!";
            case EError.VERIFICATION_FAILED:
                return "Verifikation fehlgeschlagen!";
            case EError.CERTIFICATE_ID_CANNOT_BE_FOUND:
                return "Zertifikat konnte nicht gefunden werden!!!!!";
            case EError.VERIFICATION_FAILED_EMPTY_RESPONSE:
            case EError.VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE:
                return "Verifikation fehlgeschlagen!! Zertifikat ist leer ider enthält kein Siegel";
            case EError.UNKNOWN_ERROR:
            default:
                return "Problem!!! Ein unerwarteter Fehler ist aufgetreten....!";
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

    public showInfo(info: EInfo): void {
        this.cleanupIcons();

        switch (info) {
            case EInfo.PROCESSING_VERIFICATION_CALL:
                this.addHeadlineAndInfotext(undefined);
                break;
            case EInfo.VERIFICATION_SUCCESSFUL:
                this.showSeal(true);
                this.addHeadlineAndInfotext(true);
                break;
        }
    }

    public cleanupIcons() {
        // remove seal and transaction_check icons IF exist
        this.cleanAllChilds(this.resultOutput);
        this.cleanAllChilds(this.sealOutput);
        this.cleanAllChilds(this.sealInfoText);
    }
    
    private cleanAllChilds(element: HTMLElement) {
        if (element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
    }

    public showSeal(successful: boolean): void {
        if (successful) {
            this.sealOutput.appendChild(this.createIconTag(environment.seal_icon_url, 'ubirch-verification-seal-img'));
        } else {
            this.sealOutput.appendChild(this.createIconTag(environment.no_seal_icon_url, 'ubirch-verification-no-seal-img'));
        }
    }

    public showSuccess(): void {
        this.resultOutput.innerHTML = '';
        this.errorOutput.innerHTML = '';

        this.resultOutput.appendChild(document.createElement('br'));
        this.resultOutput.appendChild(this.createTxtTag(INFO_TEXTS.SUCCESS.info, 'ubirch-verification-success'));
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

        let bloxTXData: IUbirchBlockchainNet = ((environment || {} as any).blockchain_transid_check_url[blockchain] || {} as any)[networkType];

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
            let iconId = `blockchain_transid_check${index === undefined ? '' : '_' + index}`;
            linkTag.appendChild(this.createIconTag(bloxTXData.icon_url, iconId));
        } else {
            linkTag.innerHTML = titleStr;
        }

        this.resultOutput.appendChild(linkTag);
    }

    public addHeadlineAndInfotext(successful: true | false | undefined) {
        if (successful === undefined) {
            this.resultOutput.appendChild(this.createTxtTag(INFO_TEXTS.PENDING.info, 'ubirch-verification-info'));
        } else {
            if (successful) {
                this.sealInfoText.appendChild(this.createTxtTag(INFO_TEXTS.SUCCESS.headline, 'ubirch-verification-success ubirch-verification-headline'));
            } else {
                this.sealInfoText.appendChild(this.createTxtTag(INFO_TEXTS.FAIL.headline, 'ubirch-verification-fail ubirch-verification-headline'));
                this.resultOutput.appendChild(this.createTxtTag(INFO_TEXTS.FAIL.info, 'ubirch-verification-fail'));
            }
        }
    }

    public createTxtTag(txt: string, className: string): HTMLElement {
        const txtTag: HTMLElement = document.createElement('div');
        txtTag.innerHTML = txt;
        txtTag.setAttribute('class', className);

        return txtTag;
    }

    private createIconTag(src: string, imgTagId: string, width?: string, height?: string): HTMLElement {
        const imgTag: HTMLElement = document.createElement('img');
        imgTag.setAttribute('width', width ? width : '50');
        imgTag.setAttribute('height', height ? height : '50');
        imgTag.setAttribute('src', src);

        if (imgTagId){
            imgTag.setAttribute('id', imgTagId);
        }
        return imgTag;
    }
}

function logError(errorStr: string) {
    console.log(errorStr);
}

window['UbirchVerification'] = UbirchVerification;
