import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DeviceService} from '../../../../../services/device.service';
import {KeyService} from '../../../../../services/key.service';
import {PubKeyInfo} from '../../../../../models/pub-key-info';
import {environment} from '../../../../../../environments/environment';
import {interval, of, Subscription} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {UbirchWebUIUtilsService} from '../../../../../utils/ubirch-web-uiutils.service';
import {LoadingController} from '@ionic/angular';
import {BEDevice} from '../../../../../models/bedevice';

@Component({
  selector: 'app-device-pubkeys',
  templateUrl: './device-pubkeys.page.html',
  styleUrls: ['./device-pubkeys.page.scss'],
})
export class DevicePubkeysPage implements OnInit, OnDestroy {
  @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;

  polling = new Subscription();

  loadedDevice: BEDevice;
  pubKeyList: PubKeyInfo[];

  loadingSpinner: Promise<void | HTMLIonLoadingElement>;
  loaded = false;
  private deviceSubscr: Subscription;

  constructor(
    private deviceService: DeviceService,
    private keyService: KeyService,
    private loadingController: LoadingController
  ) {
  }

  get DATE_TIME_ZONE_FORMAT(): string {
    return environment.DATE_TIME_ZONE_FORMAT;
  }

  ionViewWillEnter() {
    this.restartPolling();
  }

  ngOnInit() {
    this.deviceSubscr = this.deviceService.observableCurrentDevice
      .subscribe(
        loadedDevice => {
          this.loadedDevice = loadedDevice;
          this.restartPolling(true);
        }
      );
  }

  ionViewWillLeave() {
    this.stopPolling();
  }

  copyToClipboard(val: string) {
    UbirchWebUIUtilsService.copyToClipboard(val);
  }

  showLoader() {
    this.loadingSpinner = this.loadingController.create({
      message: 'Loading pubKeys of thing'
    }).then((res) => {
      res.present();
    });
  }

  hideLoader() {
    if (this.loadingSpinner) {
      this.loadingController.dismiss();
      this.loadingSpinner = undefined;
    }
  }

  private restartPolling(showSpinner?: boolean) {
    this.stopPolling();

    this.polling = interval(environment.POLLING_INTERVAL_MILLISECONDS)
      .pipe(
        startWith(0),
        switchMap(() => {
          if (this.loadedDevice && this.loadedDevice.hwDeviceId) {
            // load pubKeys
            if (showSpinner) {
              this.showLoader();
            }
            return this.keyService.getPubKeysOfThing(this.loadedDevice.hwDeviceId);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(pubKeyList => {
          // list of pubKeys, sort by validNotAfter
          this.pubKeyList = pubKeyList && pubKeyList.length > 0 ?
            pubKeyList.sort(KeyService.compareKeys) : undefined;
          this.loaded = true;
          this.hideLoader();
        }
      );
  }

  private stopPolling() {
    if (this.polling) {
      this.polling.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.stopPolling();
    if (this.deviceSubscr) {
      this.deviceSubscr.unsubscribe();
    }
  }

}
