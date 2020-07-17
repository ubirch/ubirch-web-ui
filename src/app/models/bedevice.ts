import {User} from './user';
import {Group} from './group';
import {DeviceService} from '../services/device.service';

export class BEDevice {
  public id: string;
  public hwDeviceId: string;
  public description: string;
  public owner: User[];
  public groups: Group[];
  public attributes: {
    apiConfig: string[];
    apiConfig_new?: string[];
    apiConfig_old?: string[];
    deviceTypeProperties: string[];
    claiming_tags?: string[];
    deviceConfig: string[];
  };
  public deviceType: string;
  public created: string; // timestamp

  public secondaryIndex: string;
  public ownerId: string;

  constructor(props) {
    if (!props || (!props.hwDeviceId && !props.secondaryIndex)) {
      throw new Error(
        `BEDevice constructor call without proper device data: must have set one of hwDeviceId and secondaryIndex: ${props}`);
    }

    Object.assign(this, props);

    if (this.secondaryIndex) {
      if (this.hwDeviceId !== undefined && this.hwDeviceId !== '') {
        console.warn('BEDevice constructor call with both hwDeviceId and secondaryIndex - hwDeviceId will be ignored!');
        this.hwDeviceId = '';
      }
    }
    if (this.attributes && this.attributes.claiming_tags) {
      this.attributes.claiming_tags = DeviceService.createClaimingTagsFromFormData(this.attributes.claiming_tags);
    }

    return this;
  }
}
