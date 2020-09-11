import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Upp} from '../../../../models/upp';
import {VERIFICATION_STATE} from '../../../../services/trust.service';

@Component({
  selector: 'ubirch-verification-error-handling',
  templateUrl: './verification-error-handling.component.html',
  styleUrls: ['./verification-error-handling.component.scss'],
})
export class VerificationErrorHandlingComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {}

}
