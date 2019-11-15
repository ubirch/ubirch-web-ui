

export class DeviceState {
  public hwDeviceId: string;
  public numberUPPs: number;
  public from: Date;
  public to: Date;

  constructor(jsonState: any) {
    if (!jsonState) {
      throw new Error(`deviceState constructor called without proper state data: ${jsonState}`);
    }
    // TODO: remove key handling when endpoint respond struct has been changed
    const keys = Object.keys(jsonState);
    if (keys && keys.length > 0) {
      this.hwDeviceId = keys[0];
      const pureState = jsonState[this.hwDeviceId];


      this.numberUPPs = pureState.numberUPPs;
      if (pureState.from) {
        this.from = new Date(pureState.from);
      }
      if (pureState.to) {
        this.to = new Date(pureState.to);
      }
    }
    return this;
  }
}
