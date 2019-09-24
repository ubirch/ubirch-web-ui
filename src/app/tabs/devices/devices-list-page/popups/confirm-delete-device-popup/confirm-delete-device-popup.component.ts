import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DeviceStub} from '../../../../../models/device-stub';
import {Device} from '../../../../../models/device';

@Component({
  selector: 'app-confirm-delete-device-popup',
  templateUrl: './confirm-delete-device-popup.component.html',
  styleUrls: ['./confirm-delete-device-popup.component.scss'],
})
export class ConfirmDeleteDevicePopupComponent implements OnInit {

  @Input() devices: Device[] | DeviceStub[];

  constructor(
      public modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async deleteDevice() {
    this.modalCtrl.dismiss({
      confirmed: true
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      confirmed: false
    });
  }
}
