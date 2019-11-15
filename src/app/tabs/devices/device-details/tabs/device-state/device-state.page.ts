import { Component, OnInit } from '@angular/core';
import {interval, of, Subscription} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {startWith, switchMap} from 'rxjs/operators';
import {KeyService} from '../../../../../services/key.service';
import {DeviceService} from '../../../../../services/device.service';
import {Device} from '../../../../../models/device';
import {DeviceState} from '../../../../../models/device-state';

@Component({
  selector: 'app-device-state',
  templateUrl: './device-state.page.html',
  styleUrls: ['./device-state.page.scss'],
})
export class DeviceStatePage implements OnInit {

  polling = new Subscription();

  loadedDevice: Device;
  deviceState: DeviceState;

  constructor(
    private deviceService: DeviceService
  ) { }

  ionViewWillEnter() {
    this.restartPolling();
  }

  ngOnInit() {
    this.deviceService.observableCurrentDevice
      .subscribe(
        loadedDevice =>  {
          this.loadedDevice = loadedDevice;
          this.restartPolling();
        }
      );
  }

  ionViewWillLeave() {
    this.stopPolling();
  }

  private restartPolling() {
    this.stopPolling();

    this.polling = interval(environment.POLLING_INTERVAL_MILLISECONDS)
      .pipe(
        startWith(0),
        switchMap(() => {
          if (this.loadedDevice && this.loadedDevice.hwDeviceId) {
            // load pubKeys
            return this.deviceService.getDeviceStates([this.loadedDevice.hwDeviceId]);
          } else {
            return of(null);
          }
        })
      )
      .subscribe( deviceStates => {
          // list of deviceStates
          this.deviceState = deviceStates && deviceStates.length > 0 ?
            deviceStates[0] : undefined;
        }
      );
  }

  private stopPolling() {
    if (this.polling) {
      this.polling.unsubscribe();
    }
  }

}
