import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap, take} from 'rxjs/operators';
import {TrustService, VERIFICATION_STATE} from '../../services/trust.service';
import {CytoscapeGraphService} from '../../services/cytoscape-graph.service';
import {of, Subscription} from 'rxjs';
import {DeviceService} from '../../services/device.service';
import {BEDevice} from '../../models/bedevice';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('HEADER') header: any;

  public hash2Verify: string;
  public verifiedHash: string;
  public hashVerificationState: string;
  public currrentDevice: BEDevice;
  private hashSubscr: Subscription;
  private verifHashSubscr: Subscription;
  private checkHashSubscr: Subscription;
  private stateSubscr: Subscription;
  private currDeviceSubscr: Subscription;
  private routeQueryParamsSubscription = this.route.queryParams
    .pipe(
      take(2),
      switchMap(({hash, deviceId }: { hash?: string, deviceId?: string }) => {
        if (!hash) {
          return of(null);
        }
        if (deviceId) {
          this.currDeviceSubscr = this.deviceService.observableCurrentDevice.subscribe(
            currDevice => {
                if (currDevice && currDevice.hwDeviceId === deviceId) {
                  this.currrentDevice = currDevice;
                }
              });
        }

        return this.checkHash(hash);
      })
    ).subscribe();

  constructor(
    private truster: TrustService,
    private cytoService: CytoscapeGraphService,
    private route: ActivatedRoute,
    private deviceService: DeviceService,
  ) {
  }

  public get verificationStateLabel(): string {
    switch (this.hashVerificationState) {
      case VERIFICATION_STATE.NO_HASH:
        return '';
      case VERIFICATION_STATE.PENDING:
      case VERIFICATION_STATE.HASH_INSERTED_UNVERIFIED:
      case VERIFICATION_STATE.SERVICE_CURRENTLY_UNAVAILABLE:
        return 'Pending verification of hash: ';
      case VERIFICATION_STATE.HASH_VERIFIED:
        return 'Verified hash: ';
      case VERIFICATION_STATE.HASH_VERIFICATION_ERROR:
      case VERIFICATION_STATE.HASH_VERIFICATION_FAILED:
        return 'Verification failed for hash: ';
      default:
        return '';
    }
  }

  get headerRightLabel(): string {
    return this.currrentDevice ? 'Thing: ' : '';
  }

  get headerRightValue(): string {
    return this.currrentDevice ? this.currrentDevice.description : '';
  }

  ngOnInit() {
    this.hashSubscr = this.truster.observableHash.subscribe(hash => this.hash2Verify = hash);
    this.verifHashSubscr = this.truster.observableVerifiedHash.subscribe(hash => this.verifiedHash = hash);
    this.stateSubscr = this.truster.observableVerificationState.subscribe(state => this.hashVerificationState = state);
    // H3nM/5NZda/UEQmJckQJvMBpDYjQfdPbPV6ufKQ6wjStJY/yArQ8wTf3/+wRmHBZsrxV+yTfCUhVsrT2xsMiyQ==
  }

  ngAfterViewInit() {
    this.header.setFocus(200);
  }

  ngOnDestroy() {
    this.routeQueryParamsSubscription.unsubscribe();
    if (this.hashSubscr) {
      this.hashSubscr.unsubscribe();
    }
    if (this.verifHashSubscr) {
      this.verifHashSubscr.unsubscribe();
    }
    if (this.stateSubscr) {
      this.stateSubscr.unsubscribe();
    }
    if (this.checkHashSubscr) {
      this.checkHashSubscr.unsubscribe();
    }
    if (this.currDeviceSubscr) {
      this.currDeviceSubscr.unsubscribe();
    }
  }

  public checkHashButtonClicked(event: any): void {
    const hash = event.target.value;
    if (this.checkHashSubscr) {
      this.checkHashSubscr.unsubscribe();
    }
    this.checkHashSubscr = this.checkHash(hash).subscribe();
  }

  private checkHash(hash: string) {
    this.verifiedHash = hash ? hash.trim() : undefined;

    this.truster.saveHash(this.verifiedHash);
    this.cytoService.resetAll();
    return this.truster.verifyByHash(this.verifiedHash);
  }
}
