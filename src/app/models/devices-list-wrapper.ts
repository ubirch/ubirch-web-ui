import {DeviceStub} from './device-stub';
import {isArray} from 'util';

export class DevicesListWrapper {
    public devices: DeviceStub[];
    public numberOfDevices: number;
    public filteredDevicesSize: number;

    constructor(jsonWrapper: any) {
        if (!jsonWrapper) {
            throw new Error(`DevicesListWrapper constructor call without proper data: ${jsonWrapper}`);
        } else {
            this.devices = [];
            if (jsonWrapper.devices && isArray(jsonWrapper.devices)) {
                // pagination result
                this.devices = jsonWrapper.devices.map(device => new DeviceStub(device));
                this.numberOfDevices = jsonWrapper.numberOfDevices || 0;
            } else if (isArray(jsonWrapper)) {
                // filter result
                this.devices = jsonWrapper.map(device => new DeviceStub(device));
                this.filteredDevicesSize = this.devices.length;
            }
        }
        return this;
    }

}
