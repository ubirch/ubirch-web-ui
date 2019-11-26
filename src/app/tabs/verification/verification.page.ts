import {Component, OnInit} from '@angular/core';
import {TrustService} from '../../services/trust.service';
import {VERIFICATION_STATE} from './tabs/verification-graph/verification-graph.page';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  public headerRightLabel = 'Verified Hash: ';
  public headerRightValue = '..';

  public hash2Verify: string;
  public verificationState: string;

  constructor(
    private truster: TrustService
  ) { }

  ngOnInit() {
    // TODO: remove the following lines (just for testing correct hash)
      // oPV/aJsximYq2DbduTEarm8Jhae4uy61xOB6JIAACnFBCDJjJjBvz1sQNlqEfEAeCq1q5Kl1bv6KGz1y2wKQRw==
      // NotExistingHash = 'LFTeTv/CkXn4Y2DFWunC5i7VhUbfQvVXoJ7iNt4D5ad9udm4aXJBmhR6+UAODtXXqtzcu0tyRjTF4Sx/JJN2mg==';
      const hash = 'oPV/aJsximYq2DbduTEarm8Jhae4uy61xOB6JIAACnFBCDJjJjBvz1sQNlqEfEAeCq1q5Kl1bv6KGz1y2wKQRw==';
      const event = {target: {value: hash}};
      this.checkHash(event);
  }

  private checkHash(event: any) {
    const hash = event.target.value;
    if (hash && hash.trim() !== '') {
      this.hash2Verify = hash.trim();
      this.verificationState = VERIFICATION_STATE.HASH_INSERTED_UNVERIFIED;
      this.truster.verifyByHash(this.hash2Verify).subscribe(
        res => this.verificationState = VERIFICATION_STATE.HASH_VERIFIED,
        err => this.verificationState = VERIFICATION_STATE.HASH_VERIFICATION_ERROR
      );
       } else {
         this.verificationState = VERIFICATION_STATE.NO_HASH;
    }

//        this.verificationState = VERIFICATION_STATE.PENDING;
//         this.truster.verifyByHash(this.hash2Verify).subscribe(
//           upp => this.createUppTree(upp),
//           error => this.handleError(error)
//
//       );
  }

  // private createUppTree(upp: Upp) {
  //   if (!upp.nodeLayouter) {
  //     upp.nodeLayouter = this.createNodeLayouter();
  //   }
  //   this.graphData = {
  //     nodes: upp.allNodes,
  //     edges: upp.allEdges
  //   };
  //   this.verifiedUpp = upp;
  //   this.verificationState = VERIFICATION_STATE.HASH_VERIFIED;
  // }
  //
  // private createNodeLayouter(): Map<string, CytoscapeNodeLayout> {
  //   const layouter: Map<string, CytoscapeNodeLayout> = new Map<string, CytoscapeNodeLayout>();
  //   LAYOUT_SETTINGS.forEach(sett => layouter.set(sett.type, new CytoscapeNodeLayout(sett.nodeIcon)));
  //   return layouter;
  // }

  // private handleError(error: HttpResponseBase) {
  //   if (error && error.status) {
  //     switch (error.status) {
  //       case 404:
  //         if (error.statusText && error.statusText === 'OK') {
  //           this.verificationState = VERIFICATION_STATE.HASH_VERIFICATION_FAILED;
  //         } else {
  //           this.verificationState = VERIFICATION_STATE.HASH_VERIFICATION_ERROR;
  //         }
  //         break;
  //       case 503:
  //         this.verificationState = VERIFICATION_STATE.SERVICE_CURRENTLY_UNAVAILABLE;
  //         break;
  //     }
  //   } else {
  //     this.verificationState = VERIFICATION_STATE.HASH_VERIFICATION_ERROR;
  //   }
  // }
  //
  // public get VERIFICATION_STATE(): any {
  //   return VERIFICATION_STATE;
  // }
}
