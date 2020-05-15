import { DeviceImportResult } from './device-import-result';

describe('DeviceImportResult', () => {
  it('should create an instance', () => {
    expect(new DeviceImportResult({
        accepted: 100,
        failure: 0,
        failures: [],
        status: true,
        success: 100,
    })).toBeTruthy();
  });

  it('should create an instance with provided data', () => {
    const accepted = 100;
    const failure = 2;
    const failures = ['Failure 1', 'Failure 2'];
    const status = true;
    const success = 98;

    const result = new DeviceImportResult({ accepted, failure, failures, status, success });

    expect(result.accepted).toBe(accepted);
    expect(result.failure).toBe(failure);
    expect(result.failures).toEqual(failures);
    expect(result.status).toBe(status);
    expect(result.success).toBe(success);
  });
});
