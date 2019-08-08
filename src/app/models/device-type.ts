export class DeviceType {
    public key: string;
    public name: any;
    public iconId: string;
    public iconFileName: string;
    private iconPath = 'assets/client/icons/';

    constructor(jsonType: any) {
        if (jsonType) {
            const typeObj = typeof jsonType === 'string' ? JSON.parse(jsonType) : typeof jsonType === 'object' ? jsonType : undefined;
            if (typeObj) {
                this.key = typeObj.key;
                this.name = typeObj.name;
                this.iconId = typeObj.iconId;
                this.iconFileName = typeObj.iconFileName ? this.iconPath + typeObj.iconFileName : undefined;
            }
        }
        return this;
    }
}
