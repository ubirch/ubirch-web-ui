import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-created-devices-list-popup',
  templateUrl: './created-devices-list-popup.component.html',
  styleUrls: ['./created-devices-list-popup.component.scss'],
})
export class CreatedDevicesListPopupComponent implements OnInit {

  @Input() deviceCreateStates: Map<string, string>;

  constructor(
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

}
