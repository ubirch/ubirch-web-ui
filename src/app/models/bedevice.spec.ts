import { BEDevice } from './bedevice';

describe('BEDevice', () => {
  it('should create an instance', () => {
    expect(new BEDevice(
      {hwDeviceId: '99999999999999999999999999999999999999999999999999999'})).toBeTruthy();
  });
  it('should create an instance with a secondaryIndex', () => {
    expect(new BEDevice(
      {secondaryIndex: '88888888888888888888888888888888888888888888888888888'})).toBeTruthy();
  });
  it('should throw an error if we try to create an instance without hwDeviceId and secondaryIndex', () => {
    try {
      const device = new BEDevice({});
      expect(device).toBeFalsy();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
