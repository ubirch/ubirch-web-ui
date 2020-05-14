import { TestBed, async, inject } from '@angular/core/testing';

import { AuthOnlyGuard } from './auth-only.guard';

describe('AuthOnlyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthOnlyGuard]
    });
  });

  it('should ...', inject([AuthOnlyGuard], (guard: AuthOnlyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
