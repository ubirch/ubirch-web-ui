import {User} from './user';
import {Group} from './group';
import {isArray} from 'util';
import {environment} from '../../environments/environment';

export class Device {
    public hwDeviceId: string;
    public description: string;
    public deviceType: string;
    public owner: User;
    public groups: Group[];
    public apiConfig: string;
    public deviceConfig: string;

    constructor(jsonDevice: any) {
        if (!jsonDevice || !jsonDevice.hwDeviceId || !jsonDevice.owner) {
            throw new Error(`device constructor call without proper device data: ${jsonDevice}`);
        } else {
            this.hwDeviceId = jsonDevice.hwDeviceId;
            this.description = jsonDevice.description || '';
            this.deviceType = jsonDevice.deviceType || environment.default_device_type;
            this.apiConfig = jsonDevice.apiConfig || '';
            this.deviceConfig = jsonDevice.deviceConfig || '';

            if (jsonDevice.owner) {
                this.owner = new User(jsonDevice.owner);
            }
            this.groups = [];
            if (jsonDevice.groups && isArray(jsonDevice.groups)) {
                jsonDevice.groups.forEach(group => this.groups.push(new Group(group)));
            }
        }

        return this;
    }
}
