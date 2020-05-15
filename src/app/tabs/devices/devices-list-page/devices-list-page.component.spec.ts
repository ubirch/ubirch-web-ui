import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async, getTestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DevicesListPage } from './devices-list-page.component';
import {environment} from '../../../../environments/environment';
import { DeviceService } from 'src/app/services/device.service';
import { of, throwError } from 'rxjs';

describe('ListPage', () => {
  let component: DevicesListPage;
  let fixture: ComponentFixture<DevicesListPage>;
  let listPage: HTMLElement;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let modalCtrl: ModalController;
  let debugElement: DebugElement;
  let deviceService: DeviceService;

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
        },
        {
          provide: ModalController,
          useValue: {
            create: () => ({
              present() {},
              onDidDismiss() {
                return Promise.resolve({ data: {} });
              }
            })
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
    debugElement = fixture.debugElement;
    fixture.detectChanges();
    modalCtrl = debugElement.injector.get(ModalController);
    deviceService = debugElement.injector.get(DeviceService);
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

  it('call DeviceService.createDevicesFromData after create device modal submit', fakeAsync(() => {
    const createSpy = spyOn(deviceService, 'createDevicesFromData').and.callThrough();

    component.presentNewDeviceModal();
    tick();
    expect(createSpy).toHaveBeenCalledWith({});
  }));

  it('call finished after dismissing create device modal', fakeAsync(() => {
    const finishedSpy = spyOn(component, 'finished');
    spyOn(modalCtrl, 'create').and.returnValue({
      // @ts-ignore
      present() {},
      onDidDismiss() {
        return Promise.resolve();
      }
    });

    component.presentNewDeviceModal();
    tick();

    expect(finishedSpy).toHaveBeenCalledWith('cancl_create');
  }));

  it('call presentDevicesCreatedModal on device create success', fakeAsync(() => {
    const createdModalSpy = spyOn(component, 'presentDevicesCreatedModal').and.callThrough();
    const deviceMap = new Map();
    spyOn(deviceService, 'createDevicesFromData').and.returnValue(of(deviceMap));

    component.presentNewDeviceModal();
    tick();

    component.polling.unsubscribe();
    expect(createdModalSpy).toHaveBeenCalledWith(deviceMap);
  }));

  it('show error message on device create failure', fakeAsync(() => {
    const createdModalSpy = spyOn(component, 'presentDevicesCreatedModal').and.callThrough();
    const finishedSpy = spyOn(component, 'finished');

    const err = new Error('test error');
    const errMsg = 'something went wrong during devices creation: ' + err.message;

    spyOn(deviceService, 'createDevicesFromData').and.returnValue(throwError(err));

    component.presentNewDeviceModal();

    tick();

    component.polling.unsubscribe();
    expect(createdModalSpy).toHaveBeenCalledWith(err, errMsg);
    expect(finishedSpy).toHaveBeenCalledWith('err', ': ' + errMsg);
  }));
});
