import * as sha512 from 'js-sha512';
import {
    UbirchHashAlgorithm,
    IUbirchVerificationConfig,
    EInfo,
    EError
} from './models';
import environment from './environment';

class UbirchVerification {
    private responseHandler: ResponseHandler = new ResponseHandler();
    private view: View;
    private algorithm: UbirchHashAlgorithm;
    private elementSelector: string;

    constructor(config: IUbirchVerificationConfig) {
        if (!config.elementSelector) {
            throw new Error('Please, provide the `elementSelector` to UbirchVerification config');
        }

        this.algorithm = config.algorithm;
        this.elementSelector = config.elementSelector;

        this.view = new View(this.elementSelector);
    }

    private createHash(json: string): string {
        let transIdAB: ArrayBuffer = sha512.sha512.arrayBuffer(json);

        let transId: string = btoa(new Uint8Array(transIdAB).reduce((data, byte) => data + String.fromCharCode(byte), ''));

        return transId;
    }

    verifyJSON(json: string): void {
        const formattedJSON = this.formatJSON(json);
        const hash = this.createHash(formattedJSON);

        this.verifyHash(hash);
    }

    verifyHash(hash: string): void {
        this.sendVerificationRequest(hash);
    }

    private sendVerificationRequest(hash: string): void {
        const xhttp: XMLHttpRequest = new XMLHttpRequest();
        const self = this;

        xhttp.onreadystatechange = function() {
            if (this.readyState < 4) {
                self.view.showInfo(self.responseHandler.handleInfo(EInfo.PROCESSING_VERIFICATION_CALL));
            } else {
                switch (this.status) {
                    case 200: {
                        self.checkResponse(this.responseText);
                        // self.view.showInfo(self.responseHandler.handleInfo(EInfo.VERIFICATION_SUCCESSFUL));
                        break;
                    }
                    case 404: {
                        self.view.showError(self.responseHandler.handleError(EError.CERTIFICATE_ID_CANNOT_BE_FOUND));
                        break;
                    }
                    default: {
                        self.view.showError(self.responseHandler.handleError(EError.UNKNOWN_ERROR));
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
        // Success IF
        // 1. HTTP Status 200 -> if this fkt is called and result isn't empty
        // 2. Key Seal != ''

        if (!result) {
            this.view.showError(this.responseHandler.handleError(EError.VERIFICATION_FAILED_EMPTY_RESPONSE));
            return;
        }

        const resultObj = JSON.parse(result);

        if (!resultObj) {
            this.view.showError(this.responseHandler.handleError(EError.VERIFICATION_FAILED_EMPTY_RESPONSE));
            return;
        }

        const seal = resultObj['seal'];

        if (!seal || !seal.length) {
            this.view.showError(this.responseHandler.handleError(EError.VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE));
            return;
        }

        // showSeal();

        // check if Blockchain Transactions exist
        const blockchainTX = resultObj['anchors'];
        if (blockchainTX !== undefined + blockchainTX.length>0) {
            // show it for each item in array
            for(var i = 0; i<blockchainTX.length; i++) {
                this.view.showBloxTXIcon(blockchainTX[i], i);
            }
        }
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
            case EError.NO_ERROR: {
                return null;
            }
            case EError.CERTIFICATE_DATA_MISSING: {
                return 'Certificate data missing - please fill out form!!!';
            }
            case EError.CERTIFICATE_ID_CANNOT_BE_FOUND: {
                return 'Certificate cannot be found!!!!!';
            }
            case EError.VERIFICATION_FAILED_EMPTY_RESPONSE:
            case EError.VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE: {
                return 'Check failed!! Certificat is emptyore doesn\'t contain seal';
            }
            case EError.UNKNOWN_ERROR:
            default: {
                return 'Problem!!! No clue what really happened....!';
            }
        }
    }
}

class View {
    private host: HTMLElement;
    private infoOutput: HTMLElement;
    private errorOutput: HTMLElement;
    private resultOutput: HTMLElement;

    constructor(private elementSelector) {
        const host: HTMLElement = document.querySelector(this.elementSelector);

        if (!host) {
            throw new Error(`Element by selector '${this.elementSelector}' not found`);
        }

        this.host = host;

        const infoOutput: HTMLElement = document.createElement('div');
        const errorOutput: HTMLElement = document.createElement('div');
        const resultOutput: HTMLElement = document.createElement('div');

        this.infoOutput = infoOutput;
        this.errorOutput = errorOutput;
        this.resultOutput = resultOutput;

        this.host.appendChild(this.infoOutput);
        this.host.appendChild(this.errorOutput);
        this.host.appendChild(this.resultOutput);
    }

    showError(error): void {
        this.errorOutput.innerHTML = '';
        this.resultOutput.innerHTML = error;
    }

    showInfo(info: string): void {
        this.errorOutput.innerHTML = '';
        this.infoOutput.innerHTML = info;
    }

    showResult(): void {

    }

    showBloxTXIcon(bloxTX, index): void {
        // check name and type of block chain tx
        if (!bloxTX || !bloxTX['blockchain'] || !bloxTX['network_type']) {
            return;
        }

        if (
            !environment.blockchain_transid_check_url ||
            !environment.blockchain_transid_check_url[bloxTX['blockchain']] ||
            !environment.blockchain_transid_check_url[bloxTX['blockchain']][bloxTX['network_type']]
        ) {
            return;
        }

        const bloxTXData = environment.blockchain_transid_check_url[bloxTX['blockchain']][bloxTX['network_type']];
        if (bloxTXData && bloxTX.txid) {
            const linkTag: HTMLElement = document.createElement('a');

            // add transactionId to url
            linkTag.setAttribute('href', bloxTXData.url + bloxTX.txid);
            linkTag.setAttribute('title', bloxTXData.network_info);
            linkTag.setAttribute('target', '_blanc');

            // if icon url is given add img, otherwise add text
            if (bloxTXData.icon_url) {
                let iconId: string = 'blockchain_transid_check' + (index ? '_' + index : '');
                linkTag.appendChild(this.createIconTag(bloxTXData.icon_url, iconId));
            } else {
                linkTag.innerHTML = bloxTXData.network_info;
            }
            this.resultOutput.appendChild(linkTag);
        }
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

window['UbirchVerification'] = UbirchVerification;

const w = new UbirchVerification({ algorithm: 'sha256', elementSelector: 'body'});
w.verifyHash(`1lmJ7Feg1U5EJWvwE4njwRbRsqs8eLMThJq3x7N8SjNwVpEgI3WcfPJq/MRw+jpd11SU1G45D68dQcLOg4RRzA==`)