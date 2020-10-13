import {User} from './user';
import {Group} from './group';
import {environment} from '../../environments/environment';

export class Device {
  public hwDeviceId: string;
  public secondaryIndex: string;
  public created: string; // timestamp
  public description: string;
  public deviceType: string;
  public ownerId: string;
  public owner: User;
  public groups: Group[];
  public apiConfig: string;
  public deviceConfig: string;
  public claimingTags: string[];

  constructor(jsonDevice: any, ownerNeeded?: boolean) {
    if (!jsonDevice || (!jsonDevice.hwDeviceId && !jsonDevice.secondaryIndex)) {
      throw new Error(
        `device constructor call without proper device data: must have set one of hwDeviceId and secondaryIndex: ${jsonDevice}`);
    }
    if (ownerNeeded !== undefined && (jsonDevice.owner === undefined && jsonDevice.ownerId === undefined)) {
      throw new Error(`device constructor called, ownerNeeded but no owner given: ${jsonDevice}`);
    }

    if (jsonDevice.secondaryIndex) {
      this.secondaryIndex = jsonDevice.secondaryIndex;
      this.hwDeviceId = '';
    } else {
      this.hwDeviceId = jsonDevice.hwDeviceId;
    }
    this.created = jsonDevice.created;
    this.description = jsonDevice.description || '';
    this.deviceType = jsonDevice.deviceType || environment.default_device_type;
    this.apiConfig = '';
    this.deviceConfig = '';
    this.claimingTags = [];
    if (jsonDevice.attributes) {
      if (jsonDevice.attributes.apiConfig && jsonDevice.attributes.apiConfig.length > 0) {
        this.apiConfig = jsonDevice.attributes.apiConfig[0];
      }
      if (jsonDevice.attributes.deviceConfig && jsonDevice.attributes.deviceConfig.length > 0) {
        this.deviceConfig = jsonDevice.attributes.deviceConfig[0];
      }
      try {
        if (jsonDevice.attributes.claiming_tags) {
          if (jsonDevice.attributes.claiming_tags.length === 1 && jsonDevice.attributes.claiming_tags[0].toString().includes(',')) {
            // split input string from claiming
            this.claimingTags = jsonDevice.attributes.claiming_tags[0].split(', ');
          } else {
            this.claimingTags = jsonDevice.attributes.claiming_tags;
          }
        }
      } catch (err) {
        console.log('***', err);
      }
    }

    if (jsonDevice.owner) {
      this.owner = new User(jsonDevice.owner);
      this.ownerId = this.owner.id;
    } else {
      this.ownerId = jsonDevice.ownerId;
    }
    this.groups = [];
    if (jsonDevice.groups && Array.isArray(jsonDevice.groups)) {
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
    if (data.groups && Array.isArray(data.groups)) {
      this.groups = [];
      this.groups.forEach(group => this.groups.push(new Group(group)));
    }
    if (data.claimingTags) {
      this.claimingTags = this.tagArrayToString(data.claimingTags);


    }
    return this;
  }

  private tagArrayToString(tagArray: string[]): string[] {
    if (Array.isArray(tagArray) && tagArray.length > 0) {
      return tagArray.map((e: any) => e.value !== undefined ? e.value : e);
    } else {
      return [];
    }
  }
}
