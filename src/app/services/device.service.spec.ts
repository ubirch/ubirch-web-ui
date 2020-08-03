import { TestBed, getTestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { DeviceService, CreateDevicePayload } from './device.service';
import { CreateDevicesFormData } from '../tabs/devices/devices-list-page/popups/new-device-popup/new-device-popup.component';
import { Device } from '../models/device';

import { environment } from '../../environments/environment';

describe('DeviceService', () => {
  let service: DeviceService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const deviceIds = ['00000000', '11111111'];
  const hwDeviceIdJoinedStr = deviceIds.join(', ');
  const reqType = 'creation';
  const description = 'Lorem ipsum dolor sit amet';
  const deviceType = environment.default_device_type;
  const tags = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];
  const prefix = 'prefix';

  const formData = new CreateDevicesFormData({ reqType, hwDeviceId: hwDeviceIdJoinedStr, description, deviceType, tags, prefix });
  const devicesArray = deviceIds.map(hwDId =>
    new Device({ ...formData, hwDeviceId: hwDId }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(DeviceService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('call createDevices from createDevicesFromData with prepared data', () => {
    const createDevicesSpy = spyOn(service, 'createDevices');
    service.createDevicesFromData(formData);

    expect(createDevicesSpy).toHaveBeenCalledWith(reqType, tags, prefix, devicesArray);
  });

  it('send create device request from createDevices', fakeAsync(() => {
    service.createDevices(reqType, tags, prefix, devicesArray).subscribe();
    const payload = new CreateDevicePayload({ reqType, tags, prefix, devices: devicesArray });

    const req = httpMock.expectOne(service.devicesCreateUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush([]);
  }));

  it('handle create devices response', fakeAsync(() => {
    const response = deviceIds.map(id => ({ [id]: { state: 'ok'} }));
    const map = new Map();
    deviceIds.forEach(id => map.set(id, 'ok'));

    service.createDevices(reqType, tags, prefix, devicesArray).subscribe(result => {
      expect(result).toEqual(map);
    });

    const req = httpMock.expectOne(service.devicesCreateUrl);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  }));

  it('handle create devices data error', fakeAsync(() => {
    const error = 'test data error';
    const httpError = { status: 400, statusText: 'Invalid data' };
    const response = [
      { '00000000':  { state: 'notok', error, errorCode: 0 }},
      { '11111111':  { state: 'notok', error, errorCode: 3 }},
    ];
    const map = new Map();
    map.set('00000000', error);
    map.set('11111111', 'IMSI 11111111 is unknown');

    service.createDevices(reqType, tags, prefix, devicesArray)
      .pipe(catchError(err => of(err)))
      .subscribe(result => {
        expect(result).toEqual(map);
      });

    const req = httpMock.expectOne(service.devicesCreateUrl);
    expect(req.request.method).toBe('POST');
    req.flush(response, httpError);
  }));

  it('handle create device server error', fakeAsync(() => {
    const httpError = { status: 500, statusText: 'Internal server error' };

    service.createDevices(reqType, tags, prefix, devicesArray)
      .pipe(catchError(err => of(err)))
      .subscribe(result => {
        expect(result)
          .toEqual(
            // tslint:disable-next-line:max-line-length
            `Error Code: ${httpError.status}\nMessage: Http failure response for ${service.devicesCreateUrl}: ${httpError.status} ${httpError.statusText}`
          );
      });

    const req = httpMock.expectOne(service.devicesCreateUrl);
    expect(req.request.method).toBe('POST');
    req.flush(null, httpError);
  }));
});
