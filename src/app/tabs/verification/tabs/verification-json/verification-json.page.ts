import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Upp} from '../../../../models/upp';
import {TrustService, VERIFICATION_STATE} from '../../../../services/trust.service';

@Component({
  selector: 'app-verification-json',
  templateUrl: './verification-json.page.html',
  styleUrls: ['./verification-json.page.scss'],
})
export class VerificationJsonPage implements OnInit {
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
      upp => this.verifiedUpp = upp
    );
  }

  public get VERIFICATION_STATE(): any {
    return VERIFICATION_STATE;
  }

}
