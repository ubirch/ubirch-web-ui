import {Component, Input, OnInit} from '@angular/core';
import {Upp} from '../../models/upp';
import {CytoscapeNodeLayout} from '../../models/cytoscape-node-layout';
import {BlockChainNode} from '../../models/block-chain-node';
import {ToastController} from '@ionic/angular';
import {CytoscapeGraphService} from '../../services/cytoscape-graph.service';
import {TrustService} from '../../services/trust.service';

@Component({
  selector: 'ubirch-verification-graph',
  templateUrl: './verification-graph.component.html',
  styleUrls: ['./verification-graph.component.scss'],
})
export class VerificationGraphComponent implements OnInit {

  @Input() public set upp(upp: Upp) {
    this.createUppTree(upp);
  }

  public verifiedUpp: Upp;

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
      duration: 10000,
      color: 'danger'
    }]
  ]);

  constructor(
    private truster: TrustService,
    private toastCtrl: ToastController,
    private cyto: CytoscapeGraphService
  ) { }

  ngOnInit() {}

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
    this.cyto.LAYOUT_SETTINGS.forEach(sett => layouter.set(sett.type, new CytoscapeNodeLayout(sett.nodeIcon)));
    return layouter;
  }
}
