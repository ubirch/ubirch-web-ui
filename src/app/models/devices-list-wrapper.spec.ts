import { DevicesListWrapper } from './devices-list-wrapper';

describe('DevicesListWrapper', () => {
  it('should create an empty instance', () => {
    expect(new DevicesListWrapper(
        '{"numberOfDevices":0,"devices":[]}')).toBeTruthy();
  });
  it('should create an instance with one device', () => {
    expect(new DevicesListWrapper(
        '{"numberOfDevices":1,"devices":[{"hwDeviceId":"55424952-30ae-a42a-56ac-30aea42a56ac",' +
        '"description":"Leos neues Testthingy","deviceType":"default_type"}]}')).toBeTruthy();
  });
});
