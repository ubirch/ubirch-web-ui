import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Device} from '../../../models/device';
import {ModalController, ToastController} from '@ionic/angular';
import {environment} from '../../../../environments/environment';

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
      public toastController: ToastController
  ) { }

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
    this.modalCtrl.dismiss(
        this.deviceDetailsForm.getRawValue()
    );
  }

  get defaultDeviceType(): string {
    return environment.default_device_type;
  }
}
