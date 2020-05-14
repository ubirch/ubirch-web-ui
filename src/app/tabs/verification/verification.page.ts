import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {take, switchMap} from 'rxjs/operators';
import {TrustService, VERIFICATION_STATE} from '../../services/trust.service';
import {CytoscapeGraphService} from '../../services/cytoscape-graph.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit, OnDestroy {

  public hash2Verify: string;
  public verifiedHash: string;
  public hashVerificationState: string;

  constructor(
    private truster: TrustService,
    private cytoService: CytoscapeGraphService,
    private route: ActivatedRoute,
  ) { }

  private routeQueryParamsSubscription = this.route.queryParams
    .pipe(
      take(1),
      switchMap(({ hash }: { hash?: string }) => {
        if (!hash) {
          return of(null);
        }

        this.truster.saveHash(hash);
        this.cytoService.resetAll();
        return this.truster.verifyByHash(hash);
      })
    ).subscribe();

  ngOnInit() {
    this.truster.observableHash.subscribe(hash => this.hash2Verify = hash );
    this.truster.observableVerifiedHash.subscribe(hash => this.verifiedHash = hash );
    this.truster.observableVerificationState.subscribe( state => this.hashVerificationState = state);
    // H3nM/5NZda/UEQmJckQJvMBpDYjQfdPbPV6ufKQ6wjStJY/yArQ8wTf3/+wRmHBZsrxV+yTfCUhVsrT2xsMiyQ==
  }

  ngOnDestroy() {
    this.routeQueryParamsSubscription.unsubscribe();
  }

  private checkHash(event: any) {
    const hash = event.target.value;
    this.verifiedHash = hash ? hash.trim() : undefined;
    this.truster.verifyByHash(this.verifiedHash).subscribe();
    this.cytoService.resetAll();
 }

  private saveHash(event: any) {
    const hash = event.target.value;
    this.truster.saveHash(hash ? hash.trim() : undefined);
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
