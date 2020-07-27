import {Component, OnDestroy, OnInit} from '@angular/core';
import {UppStub} from '../../../../../models/upp-stub';
import {Subscription} from 'rxjs';
import {TrustService} from '../../../../../services/trust.service';
import {DeviceService} from '../../../../../services/device.service';
import {BEDevice} from '../../../../../models/bedevice';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-device-last-upp',
  templateUrl: './device-last-upp.page.html',
  styleUrls: ['./device-last-upp.page.scss'],
})
export class DeviceLastUPPPage implements OnInit, OnDestroy {

  public loadedDevice: BEDevice;
  public upp: UppStub;
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
    private trustService: TrustService,
    private deviceService: DeviceService,
    private toastCtrl: ToastController
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
            this.uppSubscr = this.trustService.getLastHashOfDevice(this.loadedDevice.hwDeviceId).subscribe(
              (resp: UppStub) => this.upp = new UppStub(resp),
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

}
