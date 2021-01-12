import {Component, OnDestroy, OnInit} from '@angular/core';
import {Upp} from '../../../../models/upp';
import {TrustService, VERIFICATION_STATE} from '../../../../services/trust.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-verification-graph',
  templateUrl: './verification-graph.page.html',
  styleUrls: ['./verification-graph.page.scss'],
})

export class VerificationGraphPage implements OnInit, OnDestroy {

  public verifiedUpp: Upp;
  public verificationState = VERIFICATION_STATE.NO_HASH;
  public hash2Verify: string;

  private observableVerifiedHashSubsc: Subscription;
  private observableVerificationStateSubsc: Subscription;
  private observableUPPSubsc: Subscription;

  constructor(
    private truster: TrustService,
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
      upp => this.verifiedUpp = upp
    );
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

}
