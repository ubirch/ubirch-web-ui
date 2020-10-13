import {IUbirchBlockhainSettings} from './iubirch-blockhain-settings';

export class IUbirchVerificationSettings {
  ubirchIcons: {
    seal: string,
    no_seal: string
  };
  assetPath: string;
  blockchainSettings: IUbirchBlockhainSettings;

  constructor(props) {
    if (props.default) {
      Object.assign(this, props.default);
    } else {
      Object.assign(this, props);
    }
    return this;
  }
}
