import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HeaderActionButton} from '../../components/header/header-action-button';
import {TrustService} from '../../services/trust.service';
import {catchError, tap} from 'rxjs/operators';
import {Upp} from '../../models/upp';
import {HttpResponseBase} from '@angular/common/http';

export const VERIFICATION_STATE = {
  NO_HASH: 'NO_HASH',
  HASH_INSERTED_UNVERIFIED: 'HASH_INSERTED_UNVERIFIED',
  PENDING: 'PENDING',
  HASH_VERIFIED: 'HASH_VERIFIED',
  HASH_VERIFICATION_FAILED: 'HASH_VERIFICATION_FAILED',
  HASH_VERIFICATION_ERROR: 'HASH_VERIFICATION_ERROR'
};

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  @ViewChild('NO_HASH', {static: true}) NO_HASH: TemplateRef<any>;
  @ViewChild('HASH_INSERTED_UNVERIFIED', {static: true}) HASH_INSERTED_UNVERIFIED: TemplateRef<any>;
  @ViewChild('PENDING', {static: true}) PENDING: TemplateRef<any>;
  @ViewChild('HASH_VERIFIED', {static: true}) HASH_VERIFIED: TemplateRef<any>;
  @ViewChild('HASH_VERIFICATION_FAILED', {static: true}) HASH_VERIFICATION_FAILED: TemplateRef<any>;
  @ViewChild('HASH_VERIFICATION_ERROR', {static: true}) HASH_VERIFICATION_ERROR: TemplateRef<any>;


  public headerRightLabel = 'Verified Hash: ';
  public headerRightValue = '..';

  public hash2Verify: string;
  public verifiedUpp: Upp;
  public verificationState = VERIFICATION_STATE.NO_HASH;

  layout = {
    name: 'dagre',
    rankDir: 'LR',
    directed: true,
    padding: 0
  };

  graphData = {
    nodes: [
      { data: { id: 'a', name: 'Signup', weight: 100, colorCode: 'blue', shapeType: 'roundrectangle' } },
      { data: { id: 'b', name: 'User Profile', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle' } },
      { data: { id: 'c', name: 'Billing', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle' } },
      { data: { id: 'd', name: 'Sales', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
      { data: { id: 'e', name: 'Referral', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
      { data: { id: 'f', name: 'Loan', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
      { data: { id: 'j', name: 'Support', weight: 100, colorCode: 'red', shapeType: 'ellipse' } },
      { data: { id: 'k', name: 'Sink Event', weight: 100, colorCode: 'green', shapeType: 'ellipse' } }
    ],
    edges: [
      { data: { source: 'a', target: 'b', colorCode: 'blue', strength: 10 } },
      { data: { source: 'b', target: 'c', colorCode: 'blue', strength: 10 } },
      { data: { source: 'c', target: 'd', colorCode: 'blue', strength: 10 } },
      { data: { source: 'c', target: 'e', colorCode: 'blue', strength: 10 } },
      { data: { source: 'c', target: 'f', colorCode: 'blue', strength: 10 } },
      { data: { source: 'e', target: 'j', colorCode: 'red', strength: 10 } },
      { data: { source: 'e', target: 'k', colorCode: 'green', strength: 10 } }
    ]
  };

  constructor(
    private truster: TrustService
  ) { }

  ngOnInit() {
  }

  private checkHash(event: any) {
    // oPV/aJsximYq2DbduTEarm8Jhae4uy61xOB6JIAACnFBCDJjJjBvz1sQNlqEfEAeCq1q5Kl1bv6KGz1y2wKQRw==
    // NotExistingHash = 'LFTeTv/CkXn4Y2DFWunC5i7VhUbfQvVXoJ7iNt4D5ad9udm4aXJBmhR6+UAODtXXqtzcu0tyRjTF4Sx/JJN2mg==';

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
    this.verifiedUpp = upp;
    this.verificationState = VERIFICATION_STATE.HASH_VERIFIED;
  }

  private handleError(error: HttpResponseBase) {
    if (error && error.status && error.status === 404) {
      if (error.statusText && error.statusText === 'OK') {
        this.verificationState = VERIFICATION_STATE.HASH_VERIFICATION_FAILED;
        return;
      }
    }
    this.verificationState = VERIFICATION_STATE.HASH_VERIFICATION_ERROR;
  }

  public get VERIFICATION_STATE(): any {
    return VERIFICATION_STATE;
  }
}
