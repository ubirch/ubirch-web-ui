import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceLastUPPPage } from './device-last-upp.page';

describe('DeviceLastUPPPage', () => {
  let component: DeviceLastUPPPage;
  let fixture: ComponentFixture<DeviceLastUPPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceLastUPPPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceLastUPPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
