import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationGraphPage } from './verification-graph.page';

describe('VerificationGraphPage', () => {
  let component: VerificationGraphPage;
  let fixture: ComponentFixture<VerificationGraphPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationGraphPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationGraphPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
