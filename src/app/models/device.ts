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

    constructor(jsonDevice: any) {
        if (!jsonDevice || !jsonDevice.hwDeviceId) {
            throw new Error(`device constructor call without proper device data: ${jsonDevice}`);
        } else {
            this.hwDeviceId = jsonDevice.hwDeviceId;
            this.description = jsonDevice.description || '';
            this.deviceType = jsonDevice.deviceType || environment.default_device_type;
            if (jsonDevice.owner) {
                this.owner = new User(jsonDevice.owner);
            }
            if (jsonDevice.groups && isArray(jsonDevice.groups)) {
                this.groups = [];
                jsonDevice.groups.forEach(group => this.groups.push(new Group(group)));
            }
            if (jsonDevice.apiConfig) {
                this.apiConfig = jsonDevice.apiConfig;
            }
        }

        return this;
    }
}
