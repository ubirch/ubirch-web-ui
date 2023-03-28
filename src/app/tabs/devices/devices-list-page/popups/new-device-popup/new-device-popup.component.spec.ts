import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { CreateDevicesFormData } from '../../../../../models/create-devices-form-data';

import { NewDevicePopupComponent, EIDType } from './new-device-popup.component';
import { environment } from '../../../../../../environments/environment';

const testUUID = '000000000000';
const testIMSI = '111111111111';
const testDescription = 'Lorem ipsum dolor sit amet';
const testTags = 'lorem, ipsum, dolor, sit, amet';
const testPrefix = 'test';

function fillFormWithTestData(form: UntypedFormGroup) {
  form.get('hwDeviceId').setValue(testUUID);
  form.get('secondaryIndex').setValue(testIMSI);
  form.get('description').setValue(testDescription);
  form.get('tags').setValue(testTags);
  form.get('prefix').setValue(testPrefix);
}

function getTestFormData(type: EIDType) {
  const data: any = {
    description: testDescription,
    tags: testTags,
    prefix: testPrefix,
    deviceType: environment.default_device_type,
  };

  switch (type) {
    case EIDType.UUID: {
      data.hwDeviceId = testUUID;
      data.reqType = 'creation';
      break;
    }
    case EIDType.IMSI: {
      data.hwDeviceId = '';
      data.secondaryIndex = testIMSI;
      data.reqType = 'claim';
      break;
    }
  }

  return new CreateDevicesFormData(data);
}

describe('NewDevicePopupComponent', () => {
  let component: NewDevicePopupComponent;
  let fixture: ComponentFixture<NewDevicePopupComponent>;
  let debugElement: DebugElement;
  let modalCtrl: ModalController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDevicePopupComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, ReactiveFormsModule, IonicModule],
      providers: [
        {
          provide: ModalController,
          useValue: {
            dismiss: () => Promise.resolve()
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDevicePopupComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
    modalCtrl = debugElement.injector.get(ModalController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('switch to UUID', fakeAsync(() => {
    component.switchToUuid();

    component.isUuidActive$.subscribe(v => {
      expect(v).toEqual(true);
    });
  }));

  it('switch to IMSI', fakeAsync(() => {
    component.switchToImsi();

    component.isImsiActive$.subscribe(v => {
      expect(v).toEqual(true);
    });
  }));

  it('dismiss', () => {
    const dismissSpy = spyOn(modalCtrl, 'dismiss').and.callThrough();

    component.dismiss();

    expect(dismissSpy).toHaveBeenCalled();
  });

  it('defaultDeviceType', () => {
    expect(component.defaultDeviceType).toEqual(environment.default_device_type);
  });

  it('createDevice (UUID)', () => {
    fillFormWithTestData(component.deviceDetailsForm);
    const dismissSpy = spyOn(modalCtrl, 'dismiss').and.callThrough();

    component.createDevice();

    expect(dismissSpy).toHaveBeenCalledWith(getTestFormData(EIDType.UUID));
  });

  it('createDevice (IMSI)', () => {
    fillFormWithTestData(component.deviceDetailsForm);
    const dismissSpy = spyOn(modalCtrl, 'dismiss').and.callThrough();

    component.switchToImsi();
    component.createDevice();

    expect(dismissSpy).toHaveBeenCalledWith(getTestFormData(EIDType.IMSI));
  });

  it('call dismiss by click on cancel button', () => {
    const cancelButton = debugElement.query(By.css('#new-device-popup-cancel'));
    const dismissSpy = spyOn(component, 'dismiss').and.callThrough();

    cancelButton.nativeElement.click();

    expect(dismissSpy).toHaveBeenCalled();
  });

  it('call dismiss by click on dismiss button', () => {
    const cancelButton = debugElement.query(By.css('#new-device-popup-dismiss'));
    const dismissSpy = spyOn(component, 'dismiss').and.callThrough();

    cancelButton.nativeElement.click();

    expect(dismissSpy).toHaveBeenCalled();
  });

  it('call switch to UUID by click', () => {
    const switchToUuidSpy = spyOn(component, 'switchToUuid');
    const uuidButton = debugElement.query(By.css('#new-device-popup-uuid'));

    uuidButton.nativeElement.click();

    expect(switchToUuidSpy).toHaveBeenCalled();
  });

  it('call switch to IMSI by click', () => {
    const switchToImsiSpy = spyOn(component, 'switchToImsi');
    const uuidButton = debugElement.query(By.css('#new-device-popup-imsi'));

    uuidButton.nativeElement.click();

    expect(switchToImsiSpy).toHaveBeenCalled();
  });

  it('call createDevice on submit', () => {
    const createDeviceSpy = spyOn(component, 'createDevice');
    const submitButton = debugElement.query(By.css('#new-device-popup-submit')).nativeElement;

    fillFormWithTestData(component.deviceDetailsForm);
    submitButton.click();

    expect(createDeviceSpy).toHaveBeenCalled();
  });
});
