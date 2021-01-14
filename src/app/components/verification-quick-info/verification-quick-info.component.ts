import {Component, Input, OnInit} from '@angular/core';
import {IUbirchBlockchain} from 'src/app/models/iubirch-blockchain';
import {IUbirchBlockchainNet} from 'src/app/models/iubirch-blockchain-net';
import {IUbirchAnchorObject} from 'widgets/verification/models';
import {TrustService} from '../../services/trust.service';
import {Upp} from '../../models/upp';
import {LoggingService} from '../../services/logging.service';

@Component({
  selector: 'ubirch-verification-quick-info',
  templateUrl: './verification-quick-info.component.html',
  styleUrls: ['./verification-quick-info.component.scss'],
})
export class VerificationQuickInfoComponent implements OnInit {
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

  constructor(
    private logger: LoggingService
    ) {
  }

  @Input()
  public set hashState(state: string) {
    this.verificationState = state;
    this.setIIcon();
    this.setAIcon();
  }

  @Input()
  public set upp(upp: Upp) {
    if (upp) {
      this.blockchains = upp.anchors.upperBlockChains;
      this.showAnchors(this.blockchains);
    }
  }

  ngOnInit() {
  }

  showAnchors(bloxTX) {
    this.anchors = [];

    if (!bloxTX) {
      return;
    }

    bloxTX.forEach((item) => {

      if (!item) {
        return;
      } else {
        const blockchain: string = item.blockchain;

        const networkType: string = item.networkType;

        if (!blockchain || !networkType) {
          return;
        }

        const blox: IUbirchBlockchain = TrustService.BlockchainSettings[blockchain];

        if (!blox) {
          this.logger.log(`Missing blockchain settings for ${blockchain}`);
          return;
        }

        const bloxTXData: IUbirchBlockchainNet = blox.explorerUrl[networkType];
        const anchor: IUbirchAnchorObject = {href: undefined, icon: '', target: '', title: ''};

        if (!bloxTXData) {
          this.logger.log(`Missing blockchain explorerUrl for ${blockchain} on ${networkType}`);
          return;
        } else if (bloxTXData.url) {
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
      case 'SERVICE_CURRENTLY_UNAVAILABLE':
      case 'HASH_INSERTED_UNVERIFIED':
        this.verificationDisplay.iVerIconSrc = this.iconPath + 'hourglass-outline.svg';
        this.verificationDisplay.iClass = 'notAvailable';
        break;
      case 'HASH_VERIFICATION_FAILED':
      case 'HASH_VERIFICATION_ERROR':
        this.verificationDisplay.iVerIconSrc = this.iconPath + 'warning-outline.svg';
        this.verificationDisplay.iClass = 'fail';
        break;
      case 'HASH_VERIFIED':
        this.verificationDisplay.iVerIconSrc = this.iconPath + 'shield-checkmark-outline.svg';
        this.verificationDisplay.iClass = 'success';
        break;
    }
  }

  setAIcon() {
    switch (this.verificationDisplay.iClass) {
      case 'success':
        if (this.anchors.length === 0) {
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
