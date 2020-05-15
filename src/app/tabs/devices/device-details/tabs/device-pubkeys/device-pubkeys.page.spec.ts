import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DevicePubkeysPage } from './device-pubkeys.page';

describe('DevicePubkeysPage', () => {
  let component: DevicePubkeysPage;
  let fixture: ComponentFixture<DevicePubkeysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicePubkeysPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicePubkeysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
