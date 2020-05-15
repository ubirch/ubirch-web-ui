import { Component, OnInit } from '@angular/core';
import {Device} from '../../../models/device';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../../services/device.service';
import {ToastController} from '@ionic/angular';
import {HeaderActionButton} from '../../../components/header/header-action-button';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.page.html',
  styleUrls: ['./device-details.page.scss'],
})
export class DeviceDetailsPage {

   id: string;
   private deviceHasUnsavedChanges = false;
   loadedDevice: Device;

   constructor(
       private deviceService: DeviceService,
       public toastCtrl: ToastController,
       public router: Router,
   ) { }

   deviceSubscription = this
    .deviceService
    .observableCurrentDevice
    .subscribe(device => {
      this.loadedDevice = device;
    });

  actionButtons = [new HeaderActionButton({
    color: 'dark',
    label: 'Back to Things List',
    iconPath: 'assets/app-icons/back-button.svg',
    action: 'back2DevicesList'
  })];

  handleButtonClick(action: string) {
    switch (action) {
      case 'back2DevicesList':
        this.navigate2DevicesList();
        break;
    }
  }

  navigate2DevicesList() {
    this.router.navigate(['devices']);
  }

  get title(): string {
    return this.loadedDevice ? this.loadedDevice.description : '';
  }
}
