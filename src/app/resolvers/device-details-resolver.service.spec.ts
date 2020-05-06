import { TestBed } from '@angular/core/testing';

import { DeviceDetailsResolverService } from './device-details-resolver.service';

describe('DeviceDetailsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceDetailsResolverService = TestBed.get(DeviceDetailsResolverService);
    expect(service).toBeTruthy();
  });
});
