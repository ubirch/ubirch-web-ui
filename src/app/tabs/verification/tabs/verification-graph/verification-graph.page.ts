import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Upp} from '../../../../models/upp';
import {TrustService, VERIFICATION_STATE} from '../../../../services/trust.service';
import {CytoscapeNodeLayout, LAYOUT_SETTINGS} from '../../../../models/cytoscape-node-layout';
import {BlockChainNode} from '../../../../models/block-chain-node';
import {environment} from '../../../../../environments/environment';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-verification-graph',
  templateUrl: './verification-graph.page.html',
  styleUrls: ['./verification-graph.page.scss'],
})

export class VerificationGraphPage implements OnInit {
  @ViewChild('NO_HASH', {static: true}) NO_HASH: TemplateRef<any>;
  @ViewChild('HASH_INSERTED_UNVERIFIED', {static: true}) HASH_INSERTED_UNVERIFIED: TemplateRef<any>;
  @ViewChild('PENDING', {static: true}) PENDING: TemplateRef<any>;
  @ViewChild('HASH_VERIFIED', {static: true}) HASH_VERIFIED: TemplateRef<any>;
  @ViewChild('HASH_VERIFICATION_FAILED', {static: true}) HASH_VERIFICATION_FAILED: TemplateRef<any>;
  @ViewChild('HASH_VERIFICATION_ERROR', {static: true}) HASH_VERIFICATION_ERROR: TemplateRef<any>;
  @ViewChild('SERVICE_CURRENTLY_UNAVAILABLE', {static: true}) SERVICE_CURRENTLY_UNAVAILABLE: TemplateRef<any>;

  public verifiedUpp: Upp;
  public verificationState = VERIFICATION_STATE.NO_HASH;
  public hash2Verify: string;

  layoutOffset = 50;
  layout = {
    name: 'preset',
    directed: true,
    fit: true,
    padding: 50,
    zoom: {
      min: 1,
      max: 1.5
    },
    transform: (node, position) => {
      switch (node._private.data.type) {
        case 'TIMESTAMP':
          position.y = 330 + this.layoutOffset;
          break;
        case 'UPP':
          position.y = 300 + this.layoutOffset;
          break;
        case 'FOUNDATION_TREE':
          position.y = 200 + this.layoutOffset;
          break;
        case 'MASTER_TREE':
          position.y = 100 + this.layoutOffset;
          break;
        case 'PUBLIC_CHAIN':
          position.y = 0 + this.layoutOffset;
          break;
      }
      if (node._private.data.positionInChain !== undefined) {
        position.x = node._private.data.positionInChain * 100 + this.layoutOffset;
      }
      return position;
    }
  };

  graphData: any;

  toastrContent: Map<string, any> = new Map([
    ['err', {
      message: 'Error occurred',
      duration: 4000,
      color: 'danger'
    }]
  ]);

  constructor(
    private truster: TrustService,
    private toastCtrl: ToastController
  ) {
  }

  ngOnInit() {
    this.truster.observableHash.subscribe(
      hash => this.hash2Verify = hash
    );
    this.truster.observableVerificationState.subscribe(
      state => this.verificationState = state
    );
    this.truster.observableUPP.subscribe(
      upp => {
        if (upp) {
          this.createUppTree(upp);
        }
      }
    );
  }

  async finished(param: string, details?: string) {
    const content = this.toastrContent.get(param);
    if (details && content && content.message) {
      content.message = content.message + ': ' + details;
    }
    const toast = await this.toastCtrl.create(content);
    toast.present();
  }

  public openBlockchainExplorer(id: string) {
    if (this.verifiedUpp) {
      const bcNode = this.verifiedUpp.getNode(id);
      if (bcNode && bcNode instanceof BlockChainNode) {
        const explorerUrl = this.truster.getBlockchainExplorerUrl(bcNode);
        if (explorerUrl) {
          window.open(explorerUrl, '_bcexplorer');
          return;
        }
      }
    }
    // display error in toastr
    const msg = 'cannot contruct explorerUrl for blockChainExplorer call from node with ID: ' + id;
    this.finished('err', msg);
    console.log(msg);
  }

  private createUppTree(upp: Upp) {
    if (!upp.nodeLayouter) {
      upp.nodeLayouter = this.createNodeLayouter();
    }
    this.graphData = {
      nodes: upp.allNodes,
      edges: upp.allEdges
    };
    this.verifiedUpp = upp;
  }

  private createNodeLayouter(): Map<string, CytoscapeNodeLayout> {
    const layouter: Map<string, CytoscapeNodeLayout> = new Map<string, CytoscapeNodeLayout>();
    LAYOUT_SETTINGS.forEach(sett => layouter.set(sett.type, new CytoscapeNodeLayout(sett.nodeIcon)));
    return layouter;
  }

  public get VERIFICATION_STATE(): any {
    return VERIFICATION_STATE;
  }
}
