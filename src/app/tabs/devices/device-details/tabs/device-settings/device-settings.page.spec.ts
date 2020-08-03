import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { DeviceSettingsPage } from './device-settings.page';

describe('DeviceSettingsPage', () => {
  let component: DeviceSettingsPage;
  let fixture: ComponentFixture<DeviceSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSettingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        IonicModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: fix No value accessor for form control with name: claiming_tags -> define ValueAccessor for tag-input
  xit(
    'should create -TODO: fix No value accessor for form control with name: claiming_tags -> define ValueAccessor for tag-input',
    () => {
    expect(component).toBeTruthy();
  });
});
