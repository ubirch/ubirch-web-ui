import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
    @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;

    loadedDevice: Device;
    public columnNames: any[];
    public pubKeyList: PubKeyInfo[];

  constructor(
      private deviceService: DeviceService,
      private keyService: KeyService
  ) { }

  ngOnInit() {
      // Define the columns for the data table
      // (based off the names of the keys in the JSON file)
      this.columnNames = [
          { prop: 'pubKey', name: 'öffentlicher Schlüssel', minWidth: '350'},
          { prop: 'pubKeyId', name: 'SchlüsselID'},
          { prop: 'algorithm', name: 'Algorithmus' },
          { prop: 'created', name: 'erzeugt', pipe: { transform: this.datePipe } },
          { prop: 'validNotBefore', name: 'gültig ab', pipe: { transform: this.datePipe } },
          { prop: 'validNotAfter', name: 'ungültig ab', pipe: { transform: this.datePipe } },
          { prop: 'signed', name: 'signiert' }
      ];

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

    datePipe(value: any, ...args: any[]) {
      // TODO: add time
        return new Date(value).toLocaleString('de');
    }

}
