import {Component, OnInit} from '@angular/core';
import {TrustService, VERIFICATION_STATE} from '../../services/trust.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  public hash2Verify: string;
  public hashVerificationState: string;

  constructor(
    private truster: TrustService
  ) { }

  ngOnInit() {
    this.truster.observableHash.subscribe(hash => this.hash2Verify = hash );
    this.truster.observableVerificationState.subscribe( state => this.hashVerificationState = state);
    // H3nM/5NZda/UEQmJckQJvMBpDYjQfdPbPV6ufKQ6wjStJY/yArQ8wTf3/+wRmHBZsrxV+yTfCUhVsrT2xsMiyQ==
  }

  private checkHash(event: any) {
    const hash = event.target.value;
    this.hash2Verify = hash ? hash.trim() : undefined;
    this.truster.verifyByHash(this.hash2Verify).subscribe();
 }

 public get headerRightLabel(): string {
    switch (this.hashVerificationState) {
      case VERIFICATION_STATE.NO_HASH:
        return '';
      case VERIFICATION_STATE.PENDING:
      case VERIFICATION_STATE.HASH_INSERTED_UNVERIFIED:
      case VERIFICATION_STATE.SERVICE_CURRENTLY_UNAVAILABLE:
        return 'Pending verification of hash: ';
      case VERIFICATION_STATE.HASH_VERIFIED:
        return  'Verified hash: ';
      case VERIFICATION_STATE.HASH_VERIFICATION_ERROR:
      case VERIFICATION_STATE.HASH_VERIFICATION_FAILED:
        return 'Verification failed for hash: ';
      default:
        return '';
    }
 }
}
