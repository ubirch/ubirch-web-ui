import {Component, OnDestroy, OnInit} from '@angular/core';
import {UppHash} from '../../../../../models/upp-hash';
import {Subscription} from 'rxjs';
import {TrustService} from '../../../../../services/trust.service';
import {DeviceService} from '../../../../../services/device.service';
import {BEDevice} from '../../../../../models/bedevice';
import {ToastController} from '@ionic/angular';
import {environment} from '../../../../../../environments/environment';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-device-last-upp',
  templateUrl: './device-last-upp.page.html',
  styleUrls: ['./device-last-upp.page.scss'],
})
export class DeviceLastUPPPage implements OnInit, OnDestroy {

  public loadedDevice: BEDevice;
  public uppHashes: UppHash[];
  private uppSubscr: Subscription;
  private deviceSubsc: Subscription;
  toastrContent: Map<string, any> = new Map([
    ['err', {
      message: 'Cannot load last hash of device',
      duration: 10000,
      color: 'danger'
    }]
  ]);

  constructor(
    private deviceService: DeviceService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  async finished(param: string, details?: string) {
    const content = this.toastrContent.get(param);
    if (details && content && content.message) {
      content.message = content.message + ': ' + details;
    }
    const toast = await this.toastCtrl.create(content);
    toast.present();
  }

  ngOnInit() {
    this.deviceSubsc = this.deviceService.observableCurrentDevice
      .subscribe(
        loadedDevice => {
          this.loadedDevice = loadedDevice;
          if (this.loadedDevice) {
            this.uppSubscr = this.deviceService.getLastNHashesOfDevice(this.loadedDevice.hwDeviceId).subscribe(
              (resp: UppHash[]) => this.uppHashes = resp,
              (err: Error) =>
                this.finished('err', err.message)
            );
          }
        },
        (err: Error) =>
          this.finished('err', err.message)
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
      queryParams: { hash: uppHash.hash }
    };

    this.router.navigate(['verification'], navigationExtras);
  }

  get DATE_TIME_ZONE_FORMAT(): string {
    return environment.DATE_TIME_ZONE_FORMAT;
  }
}
