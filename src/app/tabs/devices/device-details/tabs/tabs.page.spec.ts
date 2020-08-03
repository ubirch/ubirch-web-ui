import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, fakeAsync, flush, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {TabsPage} from './tabs.page';
import {DeviceService} from 'src/app/services/device.service';
import {BehaviorSubject} from 'rxjs';

import {environment} from '../../../../../environments/environment';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;
  let injector: TestBed;
  let nativeElement: HTMLElement;
  let deviceService: any;

  const DEVICE_ID = '0';
  const CLAIMIN_TAG = 'pysense';
  const dataTabSelector = '#tabs-data-tab-button';

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [TabsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: DeviceService,
          useValue: {
            observableCurrentDevice: new BehaviorSubject({
              hwDeviceId: DEVICE_ID,
              attributes: {claiming_tags: Object.keys(environment.deviceData.panelMap)}
            }),
            getAllowedCaimingTagsOfDevice: (device) => {
              try {
                return device.attributes.claiming_tags;
              } catch (e) {
                return undefined;
              }
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    injector = getTestBed();
    nativeElement = fixture.nativeElement;
    deviceService = injector.get(DeviceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showDataTab should be true if device has allowed tags', () => {
    component.showDataTab$.subscribe(v => {
      console.log('showDataTab$ set initially: ' + v);
      expect(v).toBe(true);
    });
  });

  it('showDataTab should be false if device has no allowed tags', () => {
    deviceService.observableCurrentDevice.next({claimingTags: []});
    component.showDataTab$.subscribe(v => {
      console.log('set no claiming tags - showDataTab$ changed: ' + v);
      expect(v).toBe(false);
    });
  });

  it('data tab should be shown if device has allowed tags', fakeAsync(() => {
    fixture.detectChanges();
    flush();

//    console.log('tabButton: ' + nativeElement.outerHTML);
    const tabButton = nativeElement.querySelector(dataTabSelector);
    expect(tabButton).toBeTruthy();
  }));

  it('data tab should be hidden if device has no allowed tags', fakeAsync(() => {
    deviceService.observableCurrentDevice.next({claimingTags: []});
    fixture.detectChanges();
    flush();

    console.log('tabButton: ' + nativeElement.outerHTML);
    const tabButton = nativeElement.querySelector(dataTabSelector);
    expect(tabButton).toBeNull();
  }));
});
