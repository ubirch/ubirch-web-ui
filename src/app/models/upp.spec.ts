import { Upp } from './upp';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TestBed} from '@angular/core/testing';
import {VERIFY_RESULT} from '../../../testdata/verify-result';

describe('Upp', () => {
  let service: TranslateService;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TranslateModule],
      });
      service = TestBed.inject(TranslateService);
   }
  );

  it('should create an instance', () => {
    expect(new Upp(VERIFY_RESULT, service)).toBeTruthy();
  });
});
