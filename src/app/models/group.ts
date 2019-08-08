export class Group {
    public id: string;
    public name: string;

    constructor(jsonGroup: any) {
        if (jsonGroup) {
            this.id = jsonGroup.id;
            this.name = jsonGroup.name;
        }
        return this;
    }

}
