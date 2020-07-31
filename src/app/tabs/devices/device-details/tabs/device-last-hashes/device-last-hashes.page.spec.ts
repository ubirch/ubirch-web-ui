import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceLastHashesPage } from './device-last-hashes.page';

describe('DeviceLastUPPPage', () => {
  let component: DeviceLastHashesPage;
  let fixture: ComponentFixture<DeviceLastHashesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceLastHashesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceLastHashesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
