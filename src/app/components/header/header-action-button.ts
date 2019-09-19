import {EventEmitter} from '@angular/core';

export class HeaderActionButton {
    public label: string;
    public iconName: string;
    public iconPath: string;
    public color: string;
    public action: string; // for eventEmitter

    constructor(jsonUser: any) {
        if (jsonUser) {
            this.label = jsonUser.label || 'button';
            this.iconName = jsonUser.iconName;
            this.iconPath = jsonUser.iconPath;
            this.color = jsonUser.color || 'dark';
            this.action = jsonUser.action || 'undefined';
        }
        return this;
    }
}
