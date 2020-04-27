import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DeviceTypeService } from './device-type.service';

describe('DeviceTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: DeviceTypeService = TestBed.get(DeviceTypeService);
    expect(service).toBeTruthy();
  });
});
