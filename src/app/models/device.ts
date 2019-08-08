import {User} from './user';
import {Group} from './group';
import {isArray} from 'util';
import {DeviceType} from './device-type';

export class Device {
    public id: string;
    public hwDeviceId: string;
    public description: string;
    public deviceType: DeviceType;
    public owner: User;
    public groups: Group[];
    public deviceConfig: string;
    public apiConfig: string;

    constructor(jsonDevice: any) {
        if (!jsonDevice || !jsonDevice.id) {
            throw new Error(`device constructor call without proper device data: ${jsonDevice}`);
        } else {
            this.id = jsonDevice.id;
            this.hwDeviceId = jsonDevice.hwDeviceId;
            this.description = jsonDevice.description || '';
            this.deviceType = new DeviceType(jsonDevice.deviceType);
            if (jsonDevice.owner) {
                this.owner = new User(jsonDevice.owner);
            }
            if (jsonDevice.groups && isArray(jsonDevice)) {
                this.groups = [];
                jsonDevice.groups.forEach(group => this.groups.push(new Group(group)));
            }
            this.deviceConfig = jsonDevice.deviceConfig;
            this.apiConfig = jsonDevice.apiConfig;
        }

        return this;
    }
}
