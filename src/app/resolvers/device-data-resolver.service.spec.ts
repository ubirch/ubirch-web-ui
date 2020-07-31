import {TestBed, getTestBed, async, fakeAsync, flush} from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { DeviceService } from '../services/device.service';
import { DeviceDataResolverService } from './device-data-resolver.service';
import { environment } from '../../environments/environment';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DeviceDataResolverService', () => {
  let resolver: DeviceDataResolverService;
  let router: Router;
  let injector: TestBed;
  let deviceService: MockDeviceService;

  const hwDeviceId = '0';
  const mockDevice = {
    hwDeviceId,
    attributes: {
      claiming_tags: Object.keys(environment.deviceData.panelMap)
    }
  };

  class MockDeviceService {
    observableCurrentDevice = new BehaviorSubject(mockDevice);
    getAllowedCaimingTagsOfDevice = (device) => {
      try {
        console.log(device.attributes.claiming_tags);
        return device.attributes.claiming_tags;
      } catch (e) {
        console.log(device);
        return undefined;
      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DeviceDataResolverService,
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
  }));

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  xit('do not redirect if device has allowed tags', async(() => {
    const navigateSpy = spyOn(router, 'navigate');
    deviceService.observableCurrentDevice.next(mockDevice);
    resolver.resolve().subscribe(() => {
      expect(navigateSpy).toHaveBeenCalledTimes(0);
    });

  }));

  xit('redirect if device has no allowed tags', async(() => {
    const navigateSpy = spyOn(router, 'navigate');
    const mockDeviceWithoutTags = {...mockDevice};
    mockDeviceWithoutTags.attributes.claiming_tags = [];
    deviceService.observableCurrentDevice.next(mockDeviceWithoutTags);

    resolver.resolve().subscribe(() => {
      expect(navigateSpy).toHaveBeenCalledWith(['devices', 'details', hwDeviceId, 'settings']);
    });

  }));
});
