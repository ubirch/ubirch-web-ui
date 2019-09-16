import {DeviceStub} from './device-stub';
import {isArray} from 'util';

export class DevicesListWrapper {
    public totalDevicesSize: number;
    public devices: DeviceStub[];

    constructor(jsonWrapper: any) {
        if (!jsonWrapper || jsonWrapper.total_device_size === undefined) {
            throw new Error(`DevicesListWrapper constructor call without proper data: ${jsonWrapper}`);
        } else {
            this.totalDevicesSize = jsonWrapper.total_device_size;
            if (jsonWrapper.devices && isArray(jsonWrapper.devices)) {
                this.devices = jsonWrapper.devices.map(device => new DeviceStub(device));
            } else {
                this.devices = [];
            }
        }
        return this;
    }

}
