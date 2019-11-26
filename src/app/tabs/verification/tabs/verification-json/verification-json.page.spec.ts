import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationJsonPage } from './verification-json.page';

describe('VerificationJsonPage', () => {
  let component: VerificationJsonPage;
  let fixture: ComponentFixture<VerificationJsonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationJsonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationJsonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
