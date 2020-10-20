import {User} from './user';
import {Group} from './group';
import {UbirchWebUIUtilsService} from '../utils/ubirch-web-uiutils.service';

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
    deviceTypeProperties?: string[];
    claiming_tags?: string[];
    deviceConfig?: string[];
  };
  public deviceType: string;
  public created: string; // timestamp
  public canBeDeleted?: boolean;
  public ownerId?: string;

  constructor(props) {
    if (!props || (!props.hwDeviceId && !props.secondaryIndex)) {
      throw new Error(
        `BEDevice constructor call without proper device data: must have set one of hwDeviceId and secondaryIndex: ${props}`);
    }

    Object.assign(this, props);

    this.fixSpecials();

    return this;
  }

  public patch(props): BEDevice {
    if (!props) {
      return this;
    }
    const mergedDevice: BEDevice = Object.assign({}, this, props);

    if (props.attributes) {
      mergedDevice.attributes = Object.assign({}, this.attributes, props.attributes);
    }
    // TODO: check if also special handling for groups and owner needed!

    Object.assign(this, mergedDevice);
    this.fixSpecials();

    return this;
  }
  public fixSpecials() {
    if (this.canBeDeleted === undefined) {
      this.canBeDeleted = false;
    }
  }
}
