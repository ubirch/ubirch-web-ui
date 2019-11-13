import { TestBed, async, inject } from '@angular/core/testing';

import { EnterOnDashboardGuard } from './enter-on-dashboard.guard';

describe('EnterOnDashboardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterOnDashboardGuard]
    });
  });

  it('should ...', inject([EnterOnDashboardGuard], (guard: EnterOnDashboardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
