import {IUbirchBlockhainSettings} from './iubirch-blockhain-settings';

export interface IUbirchVerificationSettings {
  ubirchIcons: {
    seal: string,
    no_seal: string
  };
  asset_path: string;
  blockchainSettings: IUbirchBlockhainSettings;
}
