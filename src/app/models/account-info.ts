import {User} from './user';

export class AccountInfo {
  public user: User;
  public numberOfDevices: number;
  public isAdmin: boolean;
  public accountType?: string;
  public accountPlan?: string;
  public personalityCheckRequired?: boolean;
  public personalityChecked?: boolean;
  public personalityCheckFailed?: boolean;
  public profileSettingsRequired?: boolean;
  public profileSettingsSufficient?: boolean;
  // tslint:disable-next-line:variable-name
  private _userEntered?: boolean;

  constructor(jsonAccount: any) {
    if (jsonAccount) {
      if (jsonAccount.user) {
        this.user = new User(jsonAccount.user);
      }
      this.numberOfDevices = jsonAccount.numberOfDevices || 0;
      this.isAdmin = jsonAccount.isAdmin;

      this.accountType = jsonAccount.account_plan;
      this.accountPlan = jsonAccount.account_type;
      this.personalityCheckRequired = this.parseBoolean(jsonAccount.personality_check_required);
      this.personalityChecked = this.parseBoolean(jsonAccount.personality_checked);
      this.personalityCheckFailed = this.parseBoolean(jsonAccount.personality_check_failed);
      this.profileSettingsRequired = this.parseBoolean(jsonAccount.profile_settings_required);
      this.profileSettingsSufficient = this.parseBoolean(jsonAccount.profile_settings_sufficient);
    }
    this._userEntered = false;
    return this;
  }

  public hasUserEntered(): boolean {
    return this._userEntered;
  }

  public userEntered() {
    this._userEntered = true;
  }

  private parseBoolean(str: string): boolean {
    return str ? str.trim().toLowerCase() === 'true' : false;
  }
}
