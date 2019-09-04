import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-confirm-delete-device-popup',
  templateUrl: './confirm-delete-device-popup.component.html',
  styleUrls: ['./confirm-delete-device-popup.component.scss'],
})
export class ConfirmDeleteDevicePopupComponent implements OnInit {

  constructor(
      public modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async deleteDevice() {
    this.modalCtrl.dismiss({
      confirmed: true
    });
  }

}
