import {DeviceStub} from './device-stub';
import {DeviceState} from './device-state';

export class DevicesListWrapper {
    public devices: DeviceStub[];
    public numberOfDevices: number;
    public filteredDevicesSize: number;

    constructor(jsonWrapper: any) {
        if (!jsonWrapper) {
            throw new Error(`DevicesListWrapper constructor call without proper data: ${jsonWrapper}`);
        } else {
            this.devices = [];
            if (jsonWrapper.devices && Array.isArray(jsonWrapper.devices)) {
                // pagination result
                this.devices = jsonWrapper.devices.map(device => new DeviceStub(device));
                this.numberOfDevices = jsonWrapper.numberOfDevices || 0;
            } else if (Array.isArray(jsonWrapper)) {
                // filter result
                this.devices = jsonWrapper.map(device => new DeviceStub(device));
                this.filteredDevicesSize = this.devices.length;
            }
        }
        return this;
    }

    public setDeviceStates(states: DeviceState[]) {
      states.forEach(state => {
        const foundDevices = this.devices.filter(nextDevice => nextDevice.hwDeviceId === state.hwDeviceId);
        if (foundDevices) {
          const device = foundDevices[0];
          device.deviceState = state;
        }
      });
    }

}
