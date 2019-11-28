import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Upp} from '../../../../models/upp';
import {TrustService, VERIFICATION_STATE} from '../../../../services/trust.service';
import {CytoscapeNodeLayout, LAYOUT_SETTINGS} from '../../../../models/cytoscape-node-layout';

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

  layout = {
    name: 'concentric',
    directed: true,
    padding: 50,
    transform: (node, position) => {
      switch (node._private.data.type) {
        case 'UPP':
          position.y = 300;
          break;
        case 'FOUNDATION_TREE':
          position.y = 200;
          break;
        case 'MASTER_TREE':
          position.y = 100;
          break;
        case 'PUBLIC_CHAIN':
          position.y = 0;
          break;
      }
      if (node._private.data.positionInChain !== undefined) {
        position.x = node._private.data.positionInChain * 100;
      }
      return position;
    }
  };

  graphData: any;

  constructor(
    private truster: TrustService
  ) { }

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
