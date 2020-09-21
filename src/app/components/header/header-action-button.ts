export class HeaderActionButton {
  public labelKey: string;
  public iconName: string;
  public iconPath: string;
  public color: string;
  public action: string; // for eventEmitter
  public isBackButton: boolean;

  constructor(jsonButtonParams: any) {
    if (jsonButtonParams) {
      this.labelKey = jsonButtonParams.labelKey || 'button';
      this.iconName = jsonButtonParams.iconName;
      this.iconPath = jsonButtonParams.iconPath;
      this.color = jsonButtonParams.color || 'dark';
      this.action = jsonButtonParams.action || 'undefined';
      this.isBackButton = jsonButtonParams.isBackButton || false;
    }
    return this;
  }
}
