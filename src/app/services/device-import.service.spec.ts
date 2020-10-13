import { TestBed, fakeAsync, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DeviceImportService } from './device-import.service';
import { DeviceImportResult } from '../models/device-import-result';

describe('DeviceImportService', () => {
  let injector: TestBed;
  let service: DeviceImportService;
  let httpMock: HttpTestingController;

  const accepted = 100;
  const failure = 2;
  const failures = ['Failure 1', 'Failure 2'];
  const status = true;
  const success = 98;
  const response = { accepted, failure, failures, status, success };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    injector = getTestBed();
    service = TestBed.inject(DeviceImportService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('send import device request from importDevice', fakeAsync(() => {
    service.importDevice(new FormData()).subscribe();

    const req = httpMock.expectOne(service.importUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  }));

  it('handle import device response', fakeAsync(() => {
    const importResult = new DeviceImportResult({ accepted, failure, failures, status, success });

    service.importDevice(new FormData()).subscribe(res => {
      expect(res).toEqual(importResult);
    });

    const req = httpMock.expectOne(service.importUrl);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  }));
});
