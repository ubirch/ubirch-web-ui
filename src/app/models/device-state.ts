export const TIME_RANGES = {
  DAY: 24 * 60 * 60 * 1000,
  HOUR: 60 * 60 * 1000,
  MINUTE: 60 * 1000
};
export const UPP_THRESHHOULDS: Map<number, number[]> = new Map([
  [TIME_RANGES.DAY, [1, 1200]],
  [TIME_RANGES.HOUR, [1, 60]],
  [TIME_RANGES.MINUTE, [1, 5]]
]);

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

  public getStateColor(): string {
    if (this.numberUPPs === undefined) {
      return undefined;
    }
    if (this.numberUPPs < UPP_THRESHHOULDS.get(TIME_RANGES.HOUR)[0]) {
      return 'danger';
    } else if (this.numberUPPs < UPP_THRESHHOULDS.get(TIME_RANGES.HOUR)[1]) {
      return 'warning';
    } else {
      return 'success';
    }
  }
}
