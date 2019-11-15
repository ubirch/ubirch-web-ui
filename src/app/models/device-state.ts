

export class DeviceState {
  public hwDeviceId: string;
  public numberUPPs: number;
  public from: Date;
  public to: Date;

  constructor(jsonState: any) {
    if (!jsonState) {
      throw new Error(`deviceState constructor called without proper state data: ${jsonState}`);
    }
    this.hwDeviceId = jsonState.deviceId;
    this.numberUPPs = jsonState.numberUPPs;
    if (jsonState.from) {
      this.from = new Date(jsonState.from);
    }
    if (jsonState.to) {
      this.to = new Date(jsonState.to);
    }
    return this;
  }
}
