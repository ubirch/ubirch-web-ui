import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../../../../services/device.service';
import {Device} from '../../../../../models/device';
import {KeyService} from '../../../../../services/key.service';
import {PubKeyInfo} from '../../../../../models/pub-key-info';

@Component({
  selector: 'app-device-pubkeys',
  templateUrl: './device-pubkeys.page.html',
  styleUrls: ['./device-pubkeys.page.scss'],
})
export class DevicePubkeysPage implements OnInit {

  loadedDevice: Device;
  pubKeyList: PubKeyInfo[];

  constructor(
      private deviceService: DeviceService,
      private keyService: KeyService
  ) { }

  ngOnInit() {
    this.deviceService.observableCurrentDevice
        .subscribe(
            loadedDevice =>  {
              this.loadedDevice = loadedDevice;
              if (this.loadedDevice && this.loadedDevice.hwDeviceId) {
                // load pubKeys
                this.keyService.getPubKeysOfThing(this.loadedDevice.hwDeviceId)
                    .subscribe( pubKeyList => this.pubKeyList = pubKeyList );
              }
            }
        );
  }

}
