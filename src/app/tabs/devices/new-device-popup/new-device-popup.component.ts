import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Device} from '../../../models/device';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-new-device-popup',
  templateUrl: './new-device-popup.component.html',
  styleUrls: ['./new-device-popup.component.scss'],
})
export class NewDevicePopupComponent implements OnInit {
  deviceDetailsForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      public toastController: ToastController
  ) { }

  ngOnInit() {
    this.deviceDetailsForm = this.fb.group({
      hwDeviceId: ['', Validators.required],
      description: [''],
      deviceType: this.fb.group({
        key: ['', Validators.required],
        name: ['', Validators.required],
        iconId: ['', Validators.required],
        iconFileName: ['', Validators.required]
      })
    });
    this.patchForm();
  }

  private patchForm(device?: Device): any {
    const val = {
      hwDeviceId: device && device.hwDeviceId ? device.hwDeviceId : '',
      description: device && device.description ? device.description : '',
      deviceType: device && device.deviceType ? {
        key: device.deviceType.key,
        name: device.deviceType.name,
        iconId: device.deviceType.iconId,
        iconFileName: device.deviceType.iconFileName
      } : null
    };
    return val;
  }

  async createDevice() {
    const toast = await this.toastController.create({
      message: 'Sorry, creating device not yet implemented...',
      duration: 4000,
      color: 'warning'
    });
    toast.present();
  }
}
