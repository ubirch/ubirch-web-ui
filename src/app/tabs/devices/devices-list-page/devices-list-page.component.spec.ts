import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async, getTestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IonicModule, LoadingController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DevicesListPage } from './devices-list-page.component';
import {environment} from '../../../../environments/environment';

describe('ListPage', () => {
  let component: DevicesListPage;
  let fixture: ComponentFixture<DevicesListPage>;
  let listPage: HTMLElement;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        IonicModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: LoadingController,
          useValue: {
              create: () => Promise.resolve({ present() { }}),
              dismiss: () => Promise.resolve()
          }
        }
      ]
    })
      .compileComponents();

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  }));

  beforeEach(async () => {
    fixture = await TestBed.createComponent(DevicesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of 3 elements', fakeAsync(() => {
    // mock data
    const res = {
      devices: [
        {
          description: 'Leos neues Testthingy',
          deviceType: 'default_type',
          hwDeviceId: '55424952-30ae-a42a-56ac-30aea42a56ac',
        },
        {
          description: 'Leos neues Testthingy #2',
          deviceType: 'default_type',
          hwDeviceId: '55424952-30ae-a42a-56ac-30aea42a56ad',
        },
        {
          description: 'Leos neues Testthingy #3',
          deviceType: 'default_type',
          hwDeviceId: '55424952-30ae-a42a-56ac-30aea42a56ae',
        },
      ],
      numberOfDevices: 3,
    };

    listPage = fixture.nativeElement;

    // trigger Ionic life cycle hook
    component.ionViewWillEnter();

    // mock request configuration
    const url = environment.serverUrl + environment.apiPrefix + 'devices/page/0/size/10';
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(res);

    // wait for response, update component template
    tick();
    fixture.detectChanges();

    // stop polling
    component.polling.unsubscribe();

    // test items rendering
    const items = listPage.querySelectorAll('ion-item');
    expect(items.length).toEqual(3);
  }));
});
