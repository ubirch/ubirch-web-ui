export class User {
    public id: string;
    public username: string;
    public lastname: string;
    public firstname: string;

    constructor(jsonUser: any) {
        if (jsonUser) {
            this.id = jsonUser.id;
            this.username = jsonUser.username;
            this.lastname = jsonUser.lastname;
            this.firstname = jsonUser.firstname;
        }
        return this;
    }

    public toString(): string {
        const userStr = this.lastname ?
            (this.firstname ? this.firstname + ' ' + this.lastname : this.lastname) : this.username ? this.username : '';
        return userStr;
    }
}
