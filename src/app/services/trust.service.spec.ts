import {getTestBed, inject, TestBed} from '@angular/core/testing';

import { TrustService } from './trust.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

describe('Service: TrustService', () => {

  const notExistingHash = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
  const existingHash = 'LFTeTv/CkXn4Y2DFWunC5i7VhUbfQvVXoJ7iNt4D5ad9udm4aXJBmhR6+UAODtXXqtzcu0tyRjTF4Sx/JJN2mg==';
  const verificationSuccessful = '{"seal":"lSLEEOl+FgxhF1uJrJgVrrUmVeAAxEAsVN5O/8KRefhjYMVa6cLmLtWFRt9C9VegnuI23gPlp3252bhpckGaFHr5QA4O1deq3Ny7S3JGNMXhLH8kk3aaxEDw41+/E2/PLasvB/zVMUyzWqTiVLhaDObgCHIUj61aA/JEYDHlgorq5WUUVNGAhMaMH8KgVNAdO+YpweU02YUL","chain":null,"anchors":[{"status":"added","txid":"DMLDAPCYLTQXZ9EEYORCBVZKVEFKAYYYXTQQIRA9ZBGQQYBQQVEGRVUYSISGUBLXYDMGE99LEBX9A9999","message":"a00d49324515c8ab998dbb04cda93bfb48978c396c2ffde03db3f4377a7fd57debebdf575ae2402f5e9264d5ad520232561266aee09db0e369d55b0e02a326fa","blockchain":"iota","network_info":"IOTA Mainnet Network","network_type":"mainnet","created":"2019-08-28T13:56:02.688021"}]}';

  let injector: TestBed;
  let service: TrustService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrustService]
    });
    injector = getTestBed();
    service = injector.get(TrustService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should verify an existing hash successfully', () => {
    service.verifyByHash(existingHash).subscribe(verification => {
      expect(verification).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.API_URL}record?response_form=anchors_with_path&blockchain_info=ext`);
    expect(req.request.method).toBe('POST');
    req.flush(verificationSuccessful);
  });

});
