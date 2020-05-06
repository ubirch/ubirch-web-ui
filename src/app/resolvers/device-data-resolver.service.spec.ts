import { TestBed } from '@angular/core/testing';

import { DeviceDataResolverService } from './device-data-resolver.service';

describe('DeviceDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceDataResolverService = TestBed.get(DeviceDataResolverService);
    expect(service).toBeTruthy();
  });
});
