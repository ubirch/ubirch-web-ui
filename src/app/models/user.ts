export class User {
    public id: string;
    public username: string;
    public lastname: string;
    public firstname: string;
    private unsetStr = '-';

    constructor(jsonUser: any) {
        if (jsonUser) {
          this.id = jsonUser.id;
          this.username = jsonUser.username !== this.unsetStr ? jsonUser.username : undefined;
          this.lastname = jsonUser.lastname !== this.unsetStr ? jsonUser.lastname : undefined;
          this.firstname = jsonUser.firstname !== this.unsetStr ? jsonUser.firstname : undefined;
        }
        return this;
    }

    public toString(): string {
        const userStr = this.lastname ?
            (this.firstname ? this.firstname + ' ' + this.lastname : this.lastname) : this.username ? this.username : '';
        return userStr;
    }
}
