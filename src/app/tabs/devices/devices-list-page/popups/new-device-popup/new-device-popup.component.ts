import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';
import {Device} from '../../../../../models/device';
import {ModalController, ToastController} from '@ionic/angular';
import {environment} from '../../../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';

@Component({
  selector: 'app-new-device-popup',
  templateUrl: './new-device-popup.component.html',
  styleUrls: ['./new-device-popup.component.scss'],
})
export class NewDevicePopupComponent implements OnInit, OnDestroy {
  deviceDetailsForm: FormGroup;

  private currentIdType$: BehaviorSubject<EIDType> = new BehaviorSubject(EIDType.UUID);

  isUuidActive$: Observable<boolean> = this.currentIdType$.pipe(map(t => t === EIDType.UUID));

  isImsiActive$: Observable<boolean> = this.currentIdType$.pipe(map(t => t === EIDType.IMSI));

  /**
   * Subscription to update form validators on current ID type changing
   */
  private currentIdSubscription = this.currentIdType$
    .pipe(skip(1)) // skip the first value on component initialization
    .subscribe(
      t => {
        const form = this.deviceDetailsForm;
        let activeControl: AbstractControl, inactiveControl: AbstractControl;

        if (t === EIDType.UUID) {
          activeControl = form.get('hwDeviceId');
          inactiveControl = form.get('secondaryIndex');
        } else {
          activeControl = form.get('secondaryIndex');
          inactiveControl = form.get('hwDeviceId');
        }

        activeControl.setValidators([Validators.required]);
        inactiveControl.clearValidators();

        activeControl.updateValueAndValidity();
        inactiveControl.updateValueAndValidity();
      }
    );

  constructor(
      public modalCtrl: ModalController,
      private fb: FormBuilder,
      public toastCtrl: ToastController
  ) { }

  toastrContent: Map<string, any> = new Map([
    ['err', {
      message: 'Error occurred',
      duration: 10000,
      color: 'danger'
    }]
  ]);

  async finished(param: string, details?: string) {
    const content = this.toastrContent.get(param);
    if (details && content && content.message) {
      content.message +=  ': ' + details;
    }
    const toast = await this.toastCtrl.create(content);
    toast.present();
  }

  ngOnInit() {
    const currentIdType = this.currentIdType$.value;

    this.deviceDetailsForm = this.fb.group({
      hwDeviceId: ['', currentIdType === EIDType.UUID ? Validators.required : null],
      secondaryIndex: ['', currentIdType === EIDType.IMSI ? Validators.required : null],
      description: [''],
      deviceType: [''],
      tags: [''],
      prefix: [''],
    });
    this.deviceDetailsForm.setValue(this.patchFormValue());
  }

  ngOnDestroy() {
    this.currentIdSubscription.unsubscribe();
  }

  private patchFormValue(device?: Device): any {
    const val = {
      hwDeviceId: device && device.hwDeviceId ? device.hwDeviceId : '',
      secondaryIndex: device && device.secondaryIndex ? device.secondaryIndex : '',
      description: device && device.description ? device.description : '',
      deviceType: environment.default_device_type,
      tags: '',
      prefix: '',
    };
    return val;
  }

  async createDevice() {
    const details = this.deviceDetailsForm.getRawValue();
    const currentIdType = this.currentIdType$.value;

    if (currentIdType === EIDType.UUID) {
      delete details.secondaryIndex;
      details.reqType = 'creation' as ReqType;
    } else {
      details.hwDeviceId = '';
      details.reqType = 'claim' as ReqType;
    }

    if (details) {
      this.modalCtrl.dismiss(
          new CreateDevicesFormData(details)
      );
    } else {
      this.finished('err', 'No device data entered');
    }
  }

  get defaultDeviceType(): string {
    return environment.default_device_type;
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }

  /**
   * Select current ID type
   * @param type 
   */
  private switchType(type: EIDType) {
    this.currentIdType$.next(type);
  }

  /**
   * Set current ID type as UUID (hardware device identifier)
   */
  switchToUuid() {
    this.switchType(EIDType.UUID);
  }

  /**
   * Set current ID type as IMSI (SIM card identifier)
   */
  switchToImsi() {
    this.switchType(EIDType.IMSI);
  }
}

export enum EIDType {
  UUID = 'UUID',
  IMSI = 'IMSI',
};

export type ReqType = 'creation' | 'claim';

export class CreateDevicesFormData {
  reqType: ReqType;
  hwDeviceId: string;
  secondaryIndex?: string;
  description: string;
  deviceType: string;
  tags?: string;
  prefix?: string;

  constructor(props) {
    Object.assign(this, props);
    return this;
  }
}
