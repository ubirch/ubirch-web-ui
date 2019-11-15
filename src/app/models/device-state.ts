export class DeviceState {
  public deviceId: string;
  public numberUPPs: number;
  public from: Date;
  public to: Date;

  constructor(jsonState: any) {
    if (!jsonState) {
      throw new Error(`deviceState constructor call without proper state data: ${jsonState}`);
    }
    const keys = Object.keys(jsonState);
    if (keys && keys.length > 0) {
      this.deviceId = keys[0];
      const pureState = jsonState[this.deviceId];


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
