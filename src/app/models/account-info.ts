import {User} from './user';

export class AccountInfo {
    public user: User;
    public numberOfDevices: number;

    constructor(jsonAccount: any) {
        if (jsonAccount) {
            if (jsonAccount.user) {
                this.user = new User(jsonAccount.user);
            }
            this.numberOfDevices = jsonAccount.numberOfDevices;
        }
        return this;
    }


}
