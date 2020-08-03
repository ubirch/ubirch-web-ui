import {TestBed, getTestBed, async, fakeAsync, flush} from '@angular/core/testing';
import { Router } from '@angular/router';
import {BehaviorSubject, of} from 'rxjs';

import { DeviceService } from '../services/device.service';
import { DeviceDataResolverService } from './device-data-resolver.service';
import { environment } from '../../environments/environment';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DeviceDataResolverService', () => {
  let resolver: DeviceDataResolverService;
  let router: Router;
  let injector: TestBed;
  let deviceService: any;

  const DEVICE_ID = '0';
  const mockDevice = {
    DEVICE_ID,
    attributes: {
      claiming_tags: Object.keys(environment.deviceData.panelMap)
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DeviceDataResolverService,
        {
          provide: DeviceService,
          useValue: {
            observableCurrentDevice: new BehaviorSubject({
              hwDeviceId: DEVICE_ID,
              attributes: {claiming_tags: Object.keys(environment.deviceData.panelMap)}
            }),
            getAllowedCaimingTagsOfDevice: (device) => {
              try {
                return device.attributes.claiming_tags;
              } catch (e) {
                return undefined;
              }
            }
          }
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

  it('do not redirect if device has allowed tags', async(() => {
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
    console.log('mockDeviceWithoutTags: ' + mockDeviceWithoutTags);
    deviceService.observableCurrentDevice.next(mockDeviceWithoutTags);

    resolver.resolve().subscribe(() => {
      console.log('DeviceDataResolverService called');
      expect(navigateSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenCalledWith(['devices', 'details', DEVICE_ID, 'settings']);
    });

  }));
});
