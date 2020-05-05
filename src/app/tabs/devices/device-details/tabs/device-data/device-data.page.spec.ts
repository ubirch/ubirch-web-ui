import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDataPage } from './device-data.page';

describe('DeviceDataPage', () => {
  let component: DeviceDataPage;
  let fixture: ComponentFixture<DeviceDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
