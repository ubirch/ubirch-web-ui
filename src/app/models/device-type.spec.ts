import { DeviceType } from './device-type';

describe('DeviceType', () => {
  it('should create an instance', () => {
    expect(new DeviceType('{"type": "default_type","name": "Sensor", "iconFileName": "default_sensor.svg"}')).toBeTruthy();
  });
});
