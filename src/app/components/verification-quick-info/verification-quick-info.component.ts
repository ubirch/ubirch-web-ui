import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { IUbirchBlockchain } from 'src/app/models/iubirch-blockchain';
import { IUbirchBlockchainNet } from 'src/app/models/iubirch-blockchain-net';
import { Upp } from 'src/app/models/upp';
import { IUbirchAnchorObject } from 'widgets/verification/models';
import {TrustService, VERIFICATION_STATE} from '../../services/trust.service';
//import BlockchainSettings from '../../../../resources/blockchain-settings.json'
import { environment } from 'resources/clients/example-resources/environments/environment.local';


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
  
  constructor(private trustService: TrustService) { }

  hashState = VERIFICATION_STATE.NO_HASH;
  hash = '';
  upp: any;
  anchors = [];
  

  

  ngOnInit() {
    this.trustService.observableVerificationState.subscribe(verificationState => this.hashState = verificationState); 
    this.trustService.observableHash.subscribe(hash => this.hash = hash); 
    this.trustService.observableUPP.subscribe(upp => this.upp = upp)  
    console.log('upp')   
    if(this.upp){
      this.showAnchors(this.upp.jsonInput.anchors.upper_blockchains)
    }    
    console.log(this.anchors)
  }

  showAnchors(bloxTX) {
    if (!bloxTX) {
      console.log('keine Blockchains')
      return;
    }

    bloxTX.forEach((item) => {
      console.log(item)
      if (!item || !item.properties) {
        return;
      } else {
        const blockchain: string = item.properties.blockchain;
        console.log('blockchain')
        console.log(blockchain)
   
        const networkType: string = item.properties.network_type;
        console.log('networkType')
        console.log(networkType)
    

        if (!blockchain || !networkType) {
           return;
        }

        const blox: IUbirchBlockchain = TrustService.BlockchainSettings[blockchain];  
        console.log('blox')
        console.log(blox) 

        if (!blox) {
          return;
        }

        const bloxTXData: IUbirchBlockchainNet = blox.explorerUrl[networkType];
        const anchor: IUbirchAnchorObject = {href: undefined, icon: '', target: '', title: ''};

        if (bloxTXData.url) {
          anchor.href = bloxTXData.url.toString() + item.properties.txid;
        }

        anchor.title = bloxTX.network_info ? bloxTX.network_info : bloxTX.blockchain;
        anchor.target = '_blanc';

        if (blox.nodeIcon) {
          anchor.icon = TrustService.BlockchainIconsPath + blox.nodeIcon;
          console.log(anchor.icon)
        }
        this.anchors.push(anchor);
      }
    });   
  }

}
