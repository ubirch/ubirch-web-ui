import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationTabsPage } from './verification-tabs.page';

describe('VerificationTabsPage', () => {
  let component: VerificationTabsPage;
  let fixture: ComponentFixture<VerificationTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationTabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
