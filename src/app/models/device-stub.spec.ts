import { DeviceStub } from './device-stub';
import {Device} from './device';

describe('DeviceStub', () => {
  it('should create an instance', () => {
    expect(new DeviceStub(
        {hwDeviceId: '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'})).toBeTruthy();
  });
});
