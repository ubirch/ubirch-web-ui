import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Upp} from '../../../../models/upp';
import {TrustService} from '../../../../services/trust.service';
import {CytoscapeNodeLayout, LAYOUT_SETTINGS} from '../../../../models/cytoscape-node-layout';
import {HttpResponseBase} from '@angular/common/http';

export const VERIFICATION_STATE = {
  NO_HASH: 'NO_HASH',
  HASH_INSERTED_UNVERIFIED: 'HASH_INSERTED_UNVERIFIED',
  PENDING: 'PENDING',
  HASH_VERIFIED: 'HASH_VERIFIED',
  HASH_VERIFICATION_FAILED: 'HASH_VERIFICATION_FAILED',
  HASH_VERIFICATION_ERROR: 'HASH_VERIFICATION_ERROR',
  SERVICE_CURRENTLY_UNAVAILABLE: 'SERVICE_CURRENTLY_UNAVAILABLE'
};

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

  public headerRightLabel = 'Verified Hash: ';
  public headerRightValue = '..';

  public hash2Verify: string;
  public verifiedUpp: Upp;
  public verificationState = VERIFICATION_STATE.NO_HASH;

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
    /*
  // TODO: remove the following lines (just for testing correct hash)
  if (this.checkHashVerifyView(
    // oPV/aJsximYq2DbduTEarm8Jhae4uy61xOB6JIAACnFBCDJjJjBvz1sQNlqEfEAeCq1q5Kl1bv6KGz1y2wKQRw==
    // NotExistingHash = 'LFTeTv/CkXn4Y2DFWunC5i7VhUbfQvVXoJ7iNt4D5ad9udm4aXJBmhR6+UAODtXXqtzcu0tyRjTF4Sx/JJN2mg==';
    'oPV/aJsximYq2DbduTEarm8Jhae4uy61xOB6JIAACnFBCDJjJjBvz1sQNlqEfEAeCq1q5Kl1bv6KGz1y2wKQRw==')) {
    this.verificationState = VERIFICATION_STATE.PENDING;
    this.truster.verifyByHash(this.hash2Verify).subscribe(
      upp => this.createUppTree(upp),
      error => this.handleError(error)
    );
  }
     */
  }

  private checkHash(event: any) {
    if (this.checkHashVerifyView(event.target.value)) {
      this.verificationState = VERIFICATION_STATE.PENDING;
      this.truster.verifyByHash(this.hash2Verify).subscribe(
        upp => this.createUppTree(upp),
        error => this.handleError(error)

      );
    } else {
      this.verificationState = VERIFICATION_STATE.NO_HASH;
    }
  }

  private checkHashVerifyView(hash): boolean {
    if (hash && hash.trim() !== '') {
      this.verificationState = VERIFICATION_STATE.HASH_INSERTED_UNVERIFIED;
      this.hash2Verify = hash.trim();
      return true;
    } else {
      return false;
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
    this.verificationState = VERIFICATION_STATE.HASH_VERIFIED;
  }

  private createNodeLayouter(): Map<string, CytoscapeNodeLayout> {
    const layouter: Map<string, CytoscapeNodeLayout> = new Map<string, CytoscapeNodeLayout>();
    LAYOUT_SETTINGS.forEach(sett => layouter.set(sett.type, new CytoscapeNodeLayout(sett.nodeIcon)));
    return layouter;
  }

  private handleError(error: HttpResponseBase) {
    if (error && error.status) {
      switch (error.status) {
        case 404:
          if (error.statusText && error.statusText === 'OK') {
            this.verificationState = VERIFICATION_STATE.HASH_VERIFICATION_FAILED;
          } else {
            this.verificationState = VERIFICATION_STATE.HASH_VERIFICATION_ERROR;
          }
          break;
        case 503:
          this.verificationState = VERIFICATION_STATE.SERVICE_CURRENTLY_UNAVAILABLE;
          break;
      }
    } else {
      this.verificationState = VERIFICATION_STATE.HASH_VERIFICATION_ERROR;
    }
  }

  public get VERIFICATION_STATE(): any {
    return VERIFICATION_STATE;
  }
}
