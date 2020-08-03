import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeviceLastHashesPage} from './device-last-hashes.page';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {DeviceService} from '../../../../../services/device.service';
import {of} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {UppHash} from '../../../../../models/upp-hash';
import {map} from 'rxjs/operators';

describe('DeviceLastUPPPage', () => {
  let component: DeviceLastHashesPage;
  let fixture: ComponentFixture<DeviceLastHashesPage>;

  const DEVICE_ID = '0';
  const testData = [
    {
      deviceId: '55424952-30ae-a44e-4f40-30aea44e4f40',
      hash: 'WC7B9qbwn5A4oU/I6/0IJ+NzmBDG63QO6hXe7KuU2ul4yAPc3CldKd5CKKbhf0qXZJAva0CLXWTz00tr3F9BeQ==',
      timestamp: '2020-07-03T09:51:36.000Z'
    },
    {
      deviceId: '55424952-30ae-a44e-4f40-30aea44e4f40',
      hash: 'WC7B9qbwn5A4oU/I6/0IJ+NzmBDG63QO6hXe7KuU2ul4yAPc3CldKd5CKKbhf0qXZJAva0CLXWTz00tr3F9BeQ==',
      timestamp: '2020-07-03T09:52:36.000Z'
    },
    {
      deviceId: '55424952-30ae-a44e-4f40-30aea44e4f40',
      hash: 'WC7B9qbwn5A4oU/I6/0IJ+NzmBDG63QO6hXe7KuU2ul4yAPc3CldKd5CKKbhf0qXZJAva0CLXWTz00tr3F9BeQ==',
      timestamp: '2020-07-03T09:53:36.000Z'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceLastHashesPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([])],
      providers: [
        {
          provide: ToastController,
          useValue: {}
        },
        {
          provide: DeviceService,
          useValue: {
            observableCurrentDevice: of({hwDeviceId: DEVICE_ID}),
            getLastNHashesOfDevice: (deviceId, count) => {
              return of(testData)
                .pipe(
                  map((hashes: UppHash[]) => hashes.map((hash: UppHash) => new UppHash(hash)))
                );
            }
          }
        }
      ]
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

  it('should list the found hashes', () => {
    pending();
  });

  it('should inform user if no hashes can be found', () => {
    pending();
  });

  it('should inform user if an http error occurred', () => {
    pending();
  });
});
