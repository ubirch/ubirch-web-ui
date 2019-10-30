import {inject, TestBed} from '@angular/core/testing';

import { TrustService } from './trust.service';

describe('Service: TrustService', () => {
  let service;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [TrustService]
  }));

  beforeEach(inject([TrustService], s => {
    service = s;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should verify an existing hash successfully', () => {
    const existingHash = 'LFTeTv/CkXn4Y2DFWunC5i7VhUbfQvVXoJ7iNt4D5ad9udm4aXJBmhR6+UAODtXXqtzcu0tyRjTF4Sx/JJN2mg==';
    const verify = service.verifyByHash(existingHash);
    expect(verify).toBeDefined();
    expect(verify.seal).toBeDefined();
  });

  it('should fail when trying to verify a not existing hash', () => {
    const notExistingHash = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    const verify = service.verifyByHash(notExistingHash);
    expect(verify).toBeUndefined();
  });
});
