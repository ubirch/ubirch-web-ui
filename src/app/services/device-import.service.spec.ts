import { TestBed } from '@angular/core/testing';

import { DeviceImportService } from './device-import.service';

describe('DeviceImportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceImportService = TestBed.get(DeviceImportService);
    expect(service).toBeTruthy();
  });
});
