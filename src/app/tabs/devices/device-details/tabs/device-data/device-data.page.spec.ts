import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DeviceDataPage } from './device-data.page';
import {BehaviorSubject, of} from 'rxjs';

import { DeviceService } from 'src/app/services/device.service';

import { environment } from '../../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

describe('DeviceDataPage', () => {
  let component: DeviceDataPage;
  let fixture: ComponentFixture<DeviceDataPage>;

  const DEVICE_ID = '0';
  const CLAIMIN_TAG = 'pysense';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              parent: {
                parent: {
                  parent: {
                    params: {
                      id: DEVICE_ID
                    }
                  }
                }
              }
            }
          }
        },
        {
          provide: DeviceService,
          useValue: {
            observableCurrentDevice: of({ hwDeviceId: DEVICE_ID, attributes: {claiming_tags: [CLAIMIN_TAG] }}),
            getAllowedCaimingTagsOfDevice: (device) => {
              try {
                console.log(device);
                return device.attributes.claiming_tags;
              } catch (e) {
                return undefined;
              }
            }
          }
        },
        {
          provide: DomSanitizer,
          useValue: {
            sanitize: (ctx, val) => val,
            bypassSecurityTrustResourceUrl: val => val,
          },
        }
      ]
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
