import { ReqType } from '../tabs/devices/devices-list-page/popups/new-device-popup/new-device-popup.component';
import { UbirchWebUIUtilsService } from '../utils/ubirch-web-uiutils.service';

export class CreateDevicesFormData {
  reqType: ReqType;
  hwDeviceId: string;
  secondaryIndex?: string;
  description: string;
  deviceType: string;
  tags?: string[];
  prefix?: string;

  constructor(props) {
    if (props.hwDeviceId) {
      props.hwDeviceId = (props.hwDeviceId as string).trim();
    }

    if (props.secondaryIndex) {
      props.secondaryIndex = (props.secondaryIndex as string).trim();
    }

    const tagList = props.tags ? UbirchWebUIUtilsService.createClaimingTagsFromFormData(props.tags) : [];
    props.tags = tagList;

    Object.assign(this, props);
    return this;
  }
}
