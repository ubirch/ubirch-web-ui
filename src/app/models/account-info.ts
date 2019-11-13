import {User} from './user';

export class AccountInfo {
    public user: User;
    public numberOfDevices: number;
  // tslint:disable-next-line:variable-name
    private _userEntered?: boolean;

    constructor(jsonAccount: any) {
        if (jsonAccount) {
            if (jsonAccount.user) {
                this.user = new User(jsonAccount.user);
            }
            this.numberOfDevices = jsonAccount.numberOfDevices || 0;
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


}
