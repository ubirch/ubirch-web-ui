import { TestBed } from '@angular/core/testing';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DeviceDetailsResolverService } from './device-details-resolver.service';
import { DeviceService } from '../services/device.service';

describe('DeviceDetailsResolverService', () => {
  let resolver: DeviceDetailsResolverService;
  let deviceService: DeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), HttpClientTestingModule],
    });

    resolver = TestBed.inject(DeviceDetailsResolverService);
    deviceService = TestBed.inject(DeviceService);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('call DeviceService.loadDevice method with device id', () => {
    const loadDeviceSpy = spyOn(deviceService, 'loadDevice').and.returnValue(of(null));
    const deviceId = '0';
    const route = {
      paramMap: {
        get(_field) {
          return deviceId;
        }
      }
    } as ActivatedRouteSnapshot;

    resolver.resolve(route);
    expect(loadDeviceSpy).toHaveBeenCalledWith(deviceId);
  });
});
