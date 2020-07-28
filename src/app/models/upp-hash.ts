export class UppHash {
  public deviceId: string;
  public hash: string;
  public timestamp?: string;

  constructor(props: any) {
    Object.assign(this, props);
    return this;
  }
}
