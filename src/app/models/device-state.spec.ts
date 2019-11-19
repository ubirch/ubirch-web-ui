import { DeviceState } from './device-state';

describe('DeviceState', () => {
  it('should create an instance', () => {
    expect(new DeviceState({
      numberUPPs: 0,
      from: 1572563312776,
      to: 1573513712776
    })).toBeTruthy();
  });
});
