import { TestBed } from '@angular/core/testing';

import { UbirchWebUIUtilsService } from './ubirch-web-uiutils.service';

describe('UbirchWebUIUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UbirchWebUIUtilsService = TestBed.inject(UbirchWebUIUtilsService);
    expect(service).toBeTruthy();
  });
});
