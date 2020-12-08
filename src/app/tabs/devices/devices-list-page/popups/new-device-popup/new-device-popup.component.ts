import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { ValidatorsService } from 'src/app/validators/validators.service';
import { environment } from '../../../../../../environments/environment';
import { ToastType } from '../../../../../enums/toast-type.enum';
import { CreateDevicesFormData } from '../../../../../models/create-devices-form-data';
import { ToastService } from '../../../../../services/toast.service';

const ID_VALIDATORS = [ Validators.required, Validators.pattern(/^ *\S{1,} *$/) ];

@Component({
  selector: 'app-new-device-popup',
  templateUrl: './new-device-popup.component.html',
  styleUrls: [ './new-device-popup.component.scss' ],
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

        activeControl.setValidators(ID_VALIDATORS);
        inactiveControl.clearValidators();

        activeControl.updateValueAndValidity();
        inactiveControl.updateValueAndValidity();
      },
    );

  get defaultDeviceType(): string {
    return environment.default_device_type;
  }

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    public toast: ToastService,
    private validatorsService: ValidatorsService,
  ) {
  }

  ngOnInit() {
    const currentIdType = this.currentIdType$.value;

    this.deviceDetailsForm = this.fb.group({
      hwDeviceId: [ '', currentIdType === EIDType.UUID ? ID_VALIDATORS : null ],
      secondaryIndex: [ '', currentIdType === EIDType.IMSI ? ID_VALIDATORS : null ],
      description: [ '' ],
      deviceType: [ '' ],
      tags: [ '' ],
      prefix: [ '' ],
    });
    this.deviceDetailsForm.setValue(this.patchFormValue());
  }

  ngOnDestroy() {
    this.currentIdSubscription.unsubscribe();
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
        new CreateDevicesFormData(details),
      );
    } else {
      this.toast.openToast(ToastType.danger, 'toast.device.creation.error.no-data-inserted');
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
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

  /**
   * Select current ID type
   * @param type new selected type
   */
  private switchType(type: EIDType) {
    this.currentIdType$.next(type);
  }

  private patchFormValue(): any {
    const val = {
      hwDeviceId: '',
      secondaryIndex: '',
      description: '',
      deviceType: environment.default_device_type,
      tags: '',
      prefix: '',
    };
    return val;
  }
}

export enum EIDType {
  UUID = 'UUID',
  IMSI = 'IMSI',
}

export type ReqType = 'creation' | 'claim';
