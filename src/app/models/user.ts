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
}
