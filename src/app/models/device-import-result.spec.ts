import { DeviceImportResult } from './device-import-result';

describe('DeviceImportResult', () => {
  it('should create an instance', () => {
    expect(new DeviceImportResult({
        accepted: 100,
        failure: 0,
        faliures: [],
        status: true,
        success: 100,
    })).toBeTruthy();
  });
});
