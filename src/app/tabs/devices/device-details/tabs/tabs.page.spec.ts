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
  let deviceService: MockDeviceService;
  let nativeElement: HTMLElement;

  const mockDevice = {
    claimingTags: Object.keys(environment.deviceData.panelMap)
  }

  class MockDeviceService {
    observableCurrentDevice = new BehaviorSubject(mockDevice);
  }

  const dataTabSelector = '#tabs-data-tab-button';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: DeviceService,
          useClass: MockDeviceService
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
    deviceService = injector.get(DeviceService);
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showDataTab should be true if device has allowed tags', () => {
    component.showDataTab$.subscribe(v => expect(v).toBe(true));
  });

  it('showDataTab should be false if device has no allowed tags', () => {
    deviceService.observableCurrentDevice.next({ claimingTags: []});
    component.showDataTab$.subscribe(v => expect(v).toBe(false));
  });

  it('data tab should be shown if device has allowed tags', () => {
    const tabButton = nativeElement.querySelector(dataTabSelector);
    fixture.detectChanges();

    expect(tabButton).toBeTruthy();
  });

  it('data tab should be hidden if device has no allowed tags', () => {
    deviceService.observableCurrentDevice.next({ claimingTags: []});

    fixture.detectChanges();
    const tabButton = nativeElement.querySelector(dataTabSelector);

    expect(tabButton).toBeNull();
  });
});
