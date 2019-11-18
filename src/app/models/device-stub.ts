import {DeviceType} from './device-type';
import {DeviceTypeService} from '../services/device-type.service';
import {DeviceState} from './device-state';

export class DeviceStub {
    public hwDeviceId: string;
    public description: string;
    public deviceType: DeviceType;
  // tslint:disable-next-line:variable-name
    public deviceState: DeviceState;

    constructor(jsonDevice: any) {
        if (!jsonDevice || !jsonDevice.hwDeviceId) {
            throw new Error(`DeviceStub constructor call without proper device data: ${jsonDevice}`);
        } else {
            this.hwDeviceId = jsonDevice.hwDeviceId;
            this.description = jsonDevice.description || '';
            DeviceTypeService.getDeviceType(jsonDevice.deviceType).subscribe
                (foundDeviceType =>
                    this.deviceType = foundDeviceType);
        }

        return this;
    }
}
