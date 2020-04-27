import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

import { EnterOnDashboardGuard } from './enter-on-dashboard.guard';

describe('EnterOnDashboardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterOnDashboardGuard],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
    });
  });

  it('should ...', inject([EnterOnDashboardGuard], (guard: EnterOnDashboardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
