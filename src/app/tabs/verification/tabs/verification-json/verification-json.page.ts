import {Component, OnDestroy, OnInit} from '@angular/core';
import {Upp} from '../../../../models/upp';
import {TrustService, VERIFICATION_STATE} from '../../../../services/trust.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-verification-json',
  templateUrl: './verification-json.page.html',
  styleUrls: ['./verification-json.page.scss'],
})
export class VerificationJsonPage implements OnInit, OnDestroy {
  public verifiedUpp: Upp;
  public verificationState = VERIFICATION_STATE.NO_HASH;
  public hash2Verify: string;
  private hashSubscr: Subscription;
  private stateSubscr: Subscription;
  private uppSubscr: Subscription;

  constructor(
    private truster: TrustService
  ) {
  }

  public get VERIFICATION_STATE(): any {
    return VERIFICATION_STATE;
  }

  ngOnInit() {
    this.hashSubscr = this.truster.observableVerifiedHash.subscribe(hash => this.hash2Verify = hash);
    this.stateSubscr = this.truster.observableVerificationState.subscribe(state => this.verificationState = state);
    this.uppSubscr = this.truster.observableUPP.subscribe(upp => this.verifiedUpp = upp);
  }

  ngOnDestroy(): void {
    if (this.hashSubscr) {
      this.hashSubscr.unsubscribe();
    }
    if (this.stateSubscr) {
      this.stateSubscr.unsubscribe();
    }
    if (this.uppSubscr) {
      this.uppSubscr.unsubscribe();
    }
  }

}
