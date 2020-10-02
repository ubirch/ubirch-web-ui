import { TestBed, async, inject } from '@angular/core/testing';

import { AccountProfileValidGuard } from './account-profile-valid.guard';

describe('AccountProfileValidGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountProfileValidGuard]
    });
  });

  it('should ...', inject([AccountProfileValidGuard], (guard: AccountProfileValidGuard) => {
    expect(guard).toBeTruthy();
  }));
});
