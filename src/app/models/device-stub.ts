import {DeviceType} from './device-type';
import {DeviceTypeService} from '../services/device-type.service';
import {DeviceState} from './device-state';
import {Subscription} from 'rxjs';
import {OnDestroy} from '@angular/core';

// TODO: Add Angular decorator.
export class DeviceStub implements OnDestroy {
    public hwDeviceId: string;
    public description: string;
    public deviceType: DeviceType;
  // tslint:disable-next-line:variable-name
    public deviceState: DeviceState;
    public canBeDeleted?: boolean;
    private readonly deviceTypeSubscr: Subscription;

    constructor(jsonDevice: any) {
        if (!jsonDevice || !jsonDevice.hwDeviceId) {
            throw new Error(`DeviceStub constructor call without proper device data: ${jsonDevice}`);
        } else {
            this.hwDeviceId = jsonDevice.hwDeviceId;
            this.description = jsonDevice.description || '';
            this.deviceTypeSubscr = DeviceTypeService.getDeviceType(jsonDevice.deviceType).subscribe
                (foundDeviceType =>
                    this.deviceType = foundDeviceType);
            this.canBeDeleted = jsonDevice.canBeDeleted !== undefined ? jsonDevice.canBeDeleted : false;
        }

        return this;
    }

  ngOnDestroy(): void {
      if (this.deviceTypeSubscr) {
        this.deviceTypeSubscr.unsubscribe();
      }
  }
}
