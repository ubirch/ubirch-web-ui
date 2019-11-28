import {Component, OnInit} from '@angular/core';
import {TrustService, VERIFICATION_STATE} from '../../services/trust.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  public headerRightLabel = 'Verified Hash: ';
  public headerRightValue = '..';

  public hash2Verify: string;

  constructor(
    private truster: TrustService
  ) { }

  ngOnInit() {
    this.truster.observableHash.subscribe(hash => this.headerRightValue = hash );
    // TODO: remove the following lines (just for testing correct hash)
      // H3nM/5NZda/UEQmJckQJvMBpDYjQfdPbPV6ufKQ6wjStJY/yArQ8wTf3/+wRmHBZsrxV+yTfCUhVsrT2xsMiyQ==
      // NotExistingHash: oPV/aJsximYq2DbduTEarm8Jhae4uy61xOB6JIAACnFBCDJjJjBvz1sQNlqEfEAeCq1q5Kl1bv6KGz1y2wKQRw==
    const testhash = 'H3nM/5NZda/UEQmJckQJvMBpDYjQfdPbPV6ufKQ6wjStJY/yArQ8wTf3/+wRmHBZsrxV+yTfCUhVsrT2xsMiyQ==';
    const event = {target: {value: testhash}};
    this.checkHash(event);
  }

  private checkHash(event: any) {
    const hash = event.target.value;
    if (hash) {
      this.hash2Verify = hash.trim();
    }
    this.truster.verifyByHash(this.hash2Verify).subscribe();
 }

  // public get VERIFICATION_STATE(): any {
  //   return VERIFICATION_STATE;
  // }
}
