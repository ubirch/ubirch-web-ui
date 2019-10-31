import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceStatePage } from './device-state.page';

describe('DeviceStatePage', () => {
  let component: DeviceStatePage;
  let fixture: ComponentFixture<DeviceStatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceStatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceStatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
