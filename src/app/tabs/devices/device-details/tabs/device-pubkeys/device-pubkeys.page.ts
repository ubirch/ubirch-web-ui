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
    public columnNames: any;
    public pubKeyList: PubKeyInfo[];

  constructor(
      private deviceService: DeviceService,
      private keyService: KeyService
  ) {
      // Define the columns for the data table
      // (based off the names of the keys in the JSON file)
      this.columnNames = [
          { prop: 'pubKey', name: 'öffentlicher Schlüssel' },
          { prop: 'pubKeyId', name: 'SchlüsselID' },
          { prop: 'algorithm', name: 'Algorithmus' },
          { prop: 'created', name: 'erzeugt' },
          { prop: 'validNotBefore', name: 'gültig ab' },
          { prop: 'validNotAfter', name: 'ungültig ab' },
          { prop: 'signed', name: 'signiert' }
      ];
  }

  ngOnInit() {
    this.deviceService.observableCurrentDevice
        .subscribe(
            loadedDevice =>  {
              this.loadedDevice = loadedDevice;
              if (this.loadedDevice && this.loadedDevice.hwDeviceId) {
                // load pubKeys
                this.keyService.getPubKeysOfThing(this.loadedDevice.hwDeviceId)
                    .subscribe( pubKeyList =>
                        this.pubKeyList = pubKeyList && pubKeyList.length > 0 ? pubKeyList : undefined );
              }
            }
        );
  }

}
