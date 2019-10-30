import { Device } from './device';

describe('Device', () => {
  it('should create an instance', () => {
    expect(new Device(
        {hwDeviceId: '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'})).toBeTruthy();
  });
});
