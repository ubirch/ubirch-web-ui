export class UppStub {
  public deviceId: string;
  public found: boolean;
  public hash?: string;
  public timestamp?: string;

  constructor(props: any) {
    Object.assign(this, props);
    return this;
  }
}
