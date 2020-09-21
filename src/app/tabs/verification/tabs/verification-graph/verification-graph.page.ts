import {Component, OnDestroy, OnInit} from '@angular/core';
import {Upp} from '../../../../models/upp';
import {TrustService, VERIFICATION_STATE} from '../../../../services/trust.service';
import {CytoscapeNodeLayout} from '../../../../models/cytoscape-node-layout';
import {BlockChainNode} from '../../../../models/block-chain-node';
import {Subscription} from 'rxjs';
import {CytoscapeGraphService} from '../../../../services/cytoscape-graph.service';
import {ToastService} from '../../../../services/toast.service';
import {ToastType} from '../../../../enums/toast-type.enum';

@Component({
  selector: 'app-verification-graph',
  templateUrl: './verification-graph.page.html',
  styleUrls: ['./verification-graph.page.scss'],
})

export class VerificationGraphPage implements OnInit, OnDestroy {

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
  private observableVerifiedHashSubsc: Subscription;
  private observableVerificationStateSubsc: Subscription;
  private observableUPPSubsc: Subscription;

  constructor(
    private truster: TrustService,
    private toast: ToastService,
    private cyto: CytoscapeGraphService
  ) {
  }

  public get VERIFICATION_STATE(): any {
    return VERIFICATION_STATE;
  }

  ngOnInit() {
    this.observableVerifiedHashSubsc = this.truster.observableVerifiedHash.subscribe(
      hash => this.hash2Verify = hash
    );
    this.observableVerificationStateSubsc = this.truster.observableVerificationState.subscribe(
      state => this.verificationState = state
    );
    this.observableUPPSubsc = this.truster.observableUPP.subscribe(
      upp => {
        if (upp) {
          this.createUppTree(upp);
        }
      }
    );
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
    this.toast.openToast(
      ToastType.danger,
      'toast.verification.blockchainexplorer-call.cannot-build-url');
  }

  ngOnDestroy(): void {
    if (this.observableVerifiedHashSubsc) {
      this.observableVerifiedHashSubsc.unsubscribe();
    }
    if (this.observableVerificationStateSubsc) {
      this.observableVerificationStateSubsc.unsubscribe();
    }
    if (this.observableUPPSubsc) {
      this.observableUPPSubsc.unsubscribe();
    }
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
    this.cyto.LAYOUT_SETTINGS.forEach(sett => layouter.set(sett.type, new CytoscapeNodeLayout(sett.nodeIcon)));
    return layouter;
  }
}
