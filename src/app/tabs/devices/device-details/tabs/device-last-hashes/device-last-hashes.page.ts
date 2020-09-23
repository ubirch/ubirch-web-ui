import {Component, OnDestroy, OnInit} from '@angular/core';
import {UppHash} from '../../../../../models/upp-hash';
import {Subscription} from 'rxjs';
import {DeviceService} from '../../../../../services/device.service';
import {BEDevice} from '../../../../../models/bedevice';
import {environment} from '../../../../../../environments/environment';
import {NavigationExtras, Router} from '@angular/router';
import {ToastService} from '../../../../../services/toast.service';
import {ToastType} from '../../../../../enums/toast-type.enum';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-device-last-hashes',
  templateUrl: './device-last-hashes.page.html',
  styleUrls: ['./device-last-hashes.page.scss'],
})
export class DeviceLastHashesPage implements OnInit, OnDestroy {

  public loadedDevice: BEDevice;
  public uppHashes: UppHash[];

  private uppSubscr: Subscription;
  private deviceSubsc: Subscription;

  constructor(
    private deviceService: DeviceService,
    private toast: ToastService,
    private router: Router,
    private translateService: TranslateService
  ) {
  }

  get CURRENT_LANG(): string {
    return this.translateService.currentLang;
  }

  ngOnInit() {
    this.deviceSubsc = this.deviceService.observableCurrentDevice
      .subscribe(
        loadedDevice => {
          this.loadedDevice = loadedDevice;
          if (this.loadedDevice) {
            this.uppSubscr = this.deviceService.getLastNHashesOfDevice(
              this.loadedDevice.hwDeviceId,
              environment.lashHashesListLength).subscribe(
              (resp: UppHash[]) => this.uppHashes = resp,
              (_: Error) => this.handleError('error.device.details.recent-hashes.load.failed', undefined, [])
            );
          }
        },
        (_: Error) => this.handleError('error.device.details.unavailable', undefined, [])
      );
  }

  ngOnDestroy(): void {
    if (this.uppSubscr) {
      this.uppSubscr.unsubscribe();
    }
    if (this.deviceSubsc) {
      this.deviceSubsc.unsubscribe();
    }
  }

  public openVerification(uppHash: UppHash): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {hash: uppHash.hash, deviceId: this.loadedDevice.hwDeviceId}
    };

    this.router.navigate(['verification'], navigationExtras);
  }

  private async handleError(messageKey: string, params?: any, payload?: any) {
    if (payload) {
      this.uppHashes = payload;
    }
    this.toast.openToast(ToastType.danger, messageKey, 10000, undefined, params);
  }
}
