import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TabsPage } from './tabs.page';
import { DeviceService } from 'src/app/services/device.service';
import { of, BehaviorSubject } from 'rxjs';

import { environment } from '../../../../../environments/environment';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;
  let injector: TestBed;
  let deviceServiceSpy: any;
  let nativeElement: HTMLElement;

  const hwDeviceId = '0';
  const mockDevice = {
    hwDeviceId,
    attributes: {
      claiming_tags: Object.keys(environment.deviceData.panelMap)
    }
  };

  const dataTabSelector = '#tabs-data-tab-button';

  beforeEach(async(() => {
    deviceServiceSpy = jasmine.createSpyObj('DeviceService', ['observableCurrentDevice', 'createDevicesFromData']);

    TestBed.configureTestingModule({
      declarations: [ TabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: DeviceService,
          useClass: deviceServiceSpy
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showDataTab should be true if device has allowed tags', () => {
    component.showDataTab$.subscribe(v => expect(v).toBe(true));
  });

  it('showDataTab should be false if device has no allowed tags', () => {
    deviceServiceSpy.observableCurrentDevice.next({ claimingTags: []});
    component.showDataTab$.subscribe(v => expect(v).toBe(false));
  });

  it('data tab should be shown if device has allowed tags', () => {
    const tabButton = nativeElement.querySelector(dataTabSelector);
    fixture.detectChanges();

    expect(tabButton).toBeTruthy();
  });

  it('data tab should be hidden if device has no allowed tags', () => {
    deviceServiceSpy.observableCurrentDevice.next({ claimingTags: []});

    fixture.detectChanges();
    const tabButton = nativeElement.querySelector(dataTabSelector);

    expect(tabButton).toBeNull();
  });
});
