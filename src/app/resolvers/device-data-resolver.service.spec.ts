import { TestBed, getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { DeviceService } from '../services/device.service';
import { DeviceDataResolverService } from './device-data-resolver.service';
import { environment } from '../../environments/environment';

describe('DeviceDataResolverService', () => {
  let resolver: DeviceDataResolverService;
  let router: Router;
  let injector: TestBed;
  let deviceService: MockDeviceService;

  const hwDeviceId = '0';
  const mockDevice = {
    hwDeviceId,
    claimingTags: Object.keys(environment.deviceData.panelMap)
  }

  class MockDeviceService {
    observableCurrentDevice = new BehaviorSubject(mockDevice);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DeviceService,
          useClass: MockDeviceService
        },
        {
          provide: Router,
          useValue: {
            navigate() {},
          }
        }
      ]
    });

    resolver = TestBed.get(DeviceDataResolverService);
    injector = getTestBed();
    router = injector.get(Router);
    deviceService = injector.get(DeviceService);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('do not redirect if device has allowed tags', () => {
    const navigateSpy = spyOn(router, 'navigate');
    resolver.resolve().subscribe();

    expect(navigateSpy).toHaveBeenCalledTimes(0);
  });

  it('redirect if device has no allowed tags', () => {
    const navigateSpy = spyOn(router, 'navigate');
    deviceService.observableCurrentDevice.next({
      ...mockDevice,
      claimingTags: [],
    });
    resolver.resolve().subscribe();

    expect(navigateSpy).toHaveBeenCalledWith(['devices', 'details', hwDeviceId, 'settings']);
  });
});
