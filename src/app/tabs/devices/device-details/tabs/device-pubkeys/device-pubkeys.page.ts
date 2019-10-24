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
    public pubKeyList: PubKeyInfo[];

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
                    .subscribe( pubKeyList =>
                        // list of pubKeys, sort by validNotAfter
                        this.pubKeyList = pubKeyList && pubKeyList.length > 0 ? pubKeyList.sort(KeyService.compareKeys) : undefined );
                  // TODO: filter pubKeys that are not yet/no longer valid from the valid ones
              }
            }
        );
  }
}
