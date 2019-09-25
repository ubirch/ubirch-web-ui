import {User} from './user';
import {Group} from './group';
import {isArray} from 'util';
import {environment} from '../../environments/environment';

export class Device {
    public hwDeviceId: string;
    public created: string; // timestamp
    public description: string;
    public deviceType: string;
    public ownerId: string;
    public owner: User;
    public groups: Group[];
    public apiConfig: string;
    public deviceConfig: string;

    constructor(jsonDevice: any, ownerNeeded?: boolean) {
        if (!jsonDevice || !jsonDevice.hwDeviceId) {
            throw new Error(`device constructor call without proper device data: ${jsonDevice}`);
        }
        if (ownerNeeded !== undefined && (jsonDevice.owner === undefined && jsonDevice.ownerId === undefined)) {
            throw new Error(`device constructor called, ownerNeeded but no owner given: ${jsonDevice}`);
        }

        this.hwDeviceId = jsonDevice.hwDeviceId;
        this.created = jsonDevice.created;
        this.description = jsonDevice.description || '';
        this.deviceType = jsonDevice.deviceType || environment.default_device_type;
        this.apiConfig = '';
        this.deviceConfig = '';
        if (jsonDevice.attributes) {
            if (jsonDevice.attributes.attributesApiGroup && jsonDevice.attributes.attributesApiGroup.length > 0) {
                this.apiConfig = jsonDevice.attributes.attributesApiGroup[0];
            }
            if (jsonDevice.attributes.attributesDeviceGroup && jsonDevice.attributes.attributesDeviceGroup.length > 0) {
                this.deviceConfig = jsonDevice.attributes.attributesDeviceGroup[0];
            }
        }

        if (jsonDevice.owner) {
            this.owner = new User(jsonDevice.owner);
            this.ownerId = this.owner.id;
        } else {
            this.ownerId = jsonDevice.ownerId;
        }
        this.groups = [];
        if (jsonDevice.groups && isArray(jsonDevice.groups)) {
            jsonDevice.groups.forEach(group => this.groups.push(new Group(group)));
        }

        return this;
    }

    public patchDevice(data: any): Device {
        this.hwDeviceId = data.hwDeviceId || this.hwDeviceId;
        this.description = data.description || this.description;
        this.deviceType = data.deviceType || this.deviceType;
        this.apiConfig = data.apiConfig || this.apiConfig;
        this.deviceConfig = data.deviceConfig || this.deviceConfig;
        if (data.owner) {
            this.owner = new User(data.owner);
            this.ownerId = this.owner.id;
        } else {
            this.ownerId = data.ownerId || this.ownerId;
        }
        if (data.groups && isArray(data.groups)) {
            this.groups = [];
            this.groups.forEach(group => this.groups.push(new Group(group)));
        }
        return this;
    }
}
