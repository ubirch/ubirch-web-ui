import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { KeyService } from './key.service';

describe('KeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: KeyService = TestBed.inject(KeyService);
    expect(service).toBeTruthy();
  });
});
