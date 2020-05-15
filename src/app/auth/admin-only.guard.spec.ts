import { TestBed, inject } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminOnlyGuard } from './admin-only.guard';

describe('AdminOnlyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminOnlyGuard],
      imports: [RouterModule.forRoot([]), HttpClientTestingModule],
    });
  });

  it('should ...', inject([AdminOnlyGuard], (guard: AdminOnlyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
