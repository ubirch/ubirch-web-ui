import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Device} from '../../../../../models/device';
import {ModalController, ToastController} from '@ionic/angular';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-new-device-popup',
  templateUrl: './new-device-popup.component.html',
  styleUrls: ['./new-device-popup.component.scss'],
})
export class NewDevicePopupComponent implements OnInit {
  deviceDetailsForm: FormGroup;

  constructor(
      public modalCtrl: ModalController,
      private fb: FormBuilder,
      public toastCtrl: ToastController
  ) { }

  toastrContent: Map<string, any> = new Map([
    ['err', {
      message: 'Error occurred',
      duration: 4000,
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
    this.deviceDetailsForm = this.fb.group({
      hwDeviceId: ['', Validators.required],
      description: [''],
      deviceType: ['']
    });
    this.deviceDetailsForm.setValue(this.patchFormValue());
  }

  private patchFormValue(device?: Device): any {
    const val = {
      hwDeviceId: device && device.hwDeviceId ? device.hwDeviceId : '',
      description: device && device.description ? device.description : '',
      deviceType: environment.default_device_type
    };
    return val;
  }

  async createDevice() {
    const details = this.deviceDetailsForm.getRawValue();
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
}

export class CreateDevicesFormData {
  hwDeviceId: string;
  description: string;
  deviceType: string;

  constructor(props) {
    Object.assign(this, props);
    return this;
  }
}
