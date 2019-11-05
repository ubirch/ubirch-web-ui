import { Component, OnInit } from '@angular/core';
import {HeaderActionButton} from '../../components/header/header-action-button';
import {TrustService} from '../../services/trust.service';
import {catchError, tap} from 'rxjs/operators';
import {Upp} from '../../models/upp';

export const VERIFICATION_STATE = {
  NO_HASH: 0,
  HASH_INSERTED_UNVERIFIED: 1,
  PENDING: 2,
  HASH_VERIFIED: 3,
  HASH_VERIFICATION_FAILED: 4
};

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  public headerRightLabel = 'Verified Hash: ';
  public headerRightValue = '..';

  public hash2Verify: string;
  public verifiedUpp: Upp;
  public verificationState = VERIFICATION_STATE.NO_HASH;

  constructor(
    private truster: TrustService
  ) { }

  ngOnInit() {
  }

  private checkHash(event: any) {
    // existingHash = 'oPV/aJsximYq2DbduTEarm8Jhae4uy61xOB6JIAACnFBCDJjJjBvz1sQNlqEfEAeCq1q5Kl1bv6KGz1y2wKQRw==';
    // NotExistingHash = 'LFTeTv/CkXn4Y2DFWunC5i7VhUbfQvVXoJ7iNt4D5ad9udm4aXJBmhR6+UAODtXXqtzcu0tyRjTF4Sx/JJN2mg==';

      if (this.checkHashVerifyView(event.target.value)) {
        this.verificationState = VERIFICATION_STATE.PENDING;
        this.truster.verifyByHash(this.hash2Verify).subscribe(
          upp => this.createUppTree(upp),
          error => this.clearHashView()
        );
      } else {
        this.clearHashView();
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

  private clearHashView() {
    this.verifiedUpp = undefined;
    this.verificationState = VERIFICATION_STATE.HASH_VERIFICATION_FAILED;
  }
}
