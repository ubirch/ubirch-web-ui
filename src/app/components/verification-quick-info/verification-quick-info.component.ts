import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {IUbirchBlockchain} from 'src/app/models/iubirch-blockchain';
import {IUbirchBlockchainNet} from 'src/app/models/iubirch-blockchain-net';
import {IUbirchAnchorObject} from 'widgets/verification/models';
import {TrustService} from '../../services/trust.service';
import {Upp} from '../../models/upp';

@Component({
    selector: 'ubirch-verification-quick-info',
    templateUrl: './verification-quick-info.component.html',
    styleUrls: ['./verification-quick-info.component.scss'],
})
export class VerificationQuickInfoComponent implements OnInit {
    @ViewChild('NO_HASH', {static: true}) NO_HASH: TemplateRef<any>;
    @ViewChild('HASH_INSERTED_UNVERIFIED', {static: true}) HASH_INSERTED_UNVERIFIED: TemplateRef<any>;
    @ViewChild('PENDING', {static: true}) PENDING: TemplateRef<any>;
    @ViewChild('HASH_VERIFIED', {static: true}) HASH_VERIFIED: TemplateRef<any>;
    @ViewChild('HASH_VERIFICATION_FAILED', {static: true}) HASH_VERIFICATION_FAILED: TemplateRef<any>;
    @ViewChild('HASH_VERIFICATION_ERROR', {static: true}) HASH_VERIFICATION_ERROR: TemplateRef<any>;
    @ViewChild('SERVICE_CURRENTLY_UNAVAILABLE', {static: true}) SERVICE_CURRENTLY_UNAVAILABLE: TemplateRef<any>;
    // hashState = VERIFICATION_STATE.NO_HASH;
    hash = '';
    blockchains: any;
    anchors = [];
    verificationState: string;
    verificationDisplay = {
        iVerIconSrc: '',
        iClass: '',
        aVerIconSrc: '',
        aClass: ''
    };
    iconPath = TrustService.BlockchainIconsPath;

    constructor(private trustService: TrustService) {
    }

    @Input()
    public set hashState(state: string) {
        this.verificationState = state;
        console.log(this.verificationState);
    }

    @Input()
    public set upp(upp: Upp) {
        this.blockchains = upp.anchors.upperBlockChains;
        console.log(upp);
    }

    ngOnInit() {
        this.showAnchors(this.blockchains);
        this.setIIcon();
        this.setAIcon();


    }

    showAnchors(bloxTX) {
        if (!bloxTX) {

            return;
        }

        bloxTX.forEach((item) => {

            if (!item || !item) {
                return;
            } else {
                const blockchain: string = item.blockchain;


                const networkType: string = item.networkType;


                if (!blockchain || !networkType) {
                    return;
                }

                const blox: IUbirchBlockchain = TrustService.BlockchainSettings[blockchain];


                if (!blox) {
                    return;
                }

                const bloxTXData: IUbirchBlockchainNet = blox.explorerUrl[networkType];
                const anchor: IUbirchAnchorObject = {href: undefined, icon: '', target: '', title: ''};

                if (bloxTXData.url) {
                    anchor.href = bloxTXData.url.toString() + item.txid;
                }

                anchor.title = bloxTX.network_info ? bloxTX.network_info : bloxTX.blockchain;
                anchor.target = '_blanc';

                if (blox.nodeIcon) {
                    anchor.icon = this.iconPath + blox.nodeIcon;

                }
                this.anchors.push(anchor);
            }
        });
    }

    setIIcon() {
        switch (this.verificationState) {
            case 'PENDING':
                this.verificationDisplay.iVerIconSrc = this.iconPath + 'hourglass-outline.svg';
                this.verificationDisplay.iClass = 'notAvailable';
                break;
            case 'HASH_INSERTED_UNVERIFIED':
                this.verificationDisplay.iVerIconSrc = this.iconPath + 'hourglass-outline.svg';
                this.verificationDisplay.iClass = 'notAvailable';
                break;
            case 'HASH_VERIFICATION_FAILED':
                this.verificationDisplay.iVerIconSrc = this.iconPath + 'warning-outline.svg';
                this.verificationDisplay.iClass = 'fail';
                break;
            case 'HASH_VERIFIED':
                this.verificationDisplay.iVerIconSrc = this.iconPath + 'shield-checkmark-outline.svg';
                this.verificationDisplay.iClass = 'success';
                break;
            case 'HASH_VERIFICATION_ERROR':
                this.verificationDisplay.iVerIconSrc = this.iconPath + 'warning-outline.svg';
                this.verificationDisplay.iClass = 'fail';
                break;
            case 'SERVICE_CURRENTLY_UNAVAILABLE':
                this.verificationDisplay.iVerIconSrc = this.iconPath + 'hourglass-outline.svg';
                this.verificationDisplay.iClass = 'notAvailable';
                break;
        }
    }

    setAIcon() {
        switch (this.verificationDisplay.iClass) {
            case 'success':
                if (this.anchors === []) {
                    this.verificationDisplay.aClass = 'notAvailable';
                    this.verificationDisplay.aVerIconSrc = this.iconPath + 'hourglass-outline.svg';
                } else {
                    this.verificationDisplay.aClass = 'success';
                    this.verificationDisplay.aVerIconSrc = this.iconPath + 'shield-checkmark-outline.svg';
                }
                break;
            case 'notAvailable' :
                this.verificationDisplay.aClass = 'notAvailable';
                this.verificationDisplay.aVerIconSrc = this.iconPath + 'hourglass-outline.svg';
                break;
            case 'fail' :
                this.verificationDisplay.aClass = 'fail';
                this.verificationDisplay.aVerIconSrc = this.iconPath + 'warning-outline.svg';
                break;
        }
    }

}
