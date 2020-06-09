import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Upp} from '../../../../models/upp';
import {TrustService, VERIFICATION_STATE} from '../../../../services/trust.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-verification-json',
  templateUrl: './verification-json.page.html',
  styleUrls: ['./verification-json.page.scss'],
})
export class VerificationJsonPage implements OnInit, OnDestroy {
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
  private hashSubscr: Subscription;
  private stateSubscr: Subscription;
  private uppSubscr: Subscription;

  constructor(
    private truster: TrustService
  ) { }

  ngOnInit() {
    this.hashSubscr = this.truster.observableVerifiedHash.subscribe(hash => this.hash2Verify = hash );
    this.stateSubscr = this.truster.observableVerificationState.subscribe(state => this.verificationState = state );
    this.uppSubscr = this.truster.observableUPP.subscribe(upp => this.verifiedUpp = upp );
  }

  public get VERIFICATION_STATE(): any {
    return VERIFICATION_STATE;
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
