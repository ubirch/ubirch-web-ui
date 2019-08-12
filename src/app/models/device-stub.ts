import {DeviceType} from './device-type';

export class DeviceStub {
    public hwDeviceId: string;
    public description: string;
    public deviceType: DeviceType;

    constructor(jsonDevice: any) {
        if (!jsonDevice || !jsonDevice.id) {
            throw new Error(`DeviceStub constructor call without proper device data: ${jsonDevice}`);
        } else {
            this.hwDeviceId = jsonDevice.hwDeviceId;
            this.description = jsonDevice.description || '';
            this.deviceType = new DeviceType(jsonDevice.deviceType);
        }

        return this;
    }
}
