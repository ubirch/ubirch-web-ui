import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-created-devices-list-popup',
  templateUrl: './created-devices-list-popup.component.html',
  styleUrls: ['./created-devices-list-popup.component.scss'],
})
export class CreatedDevicesListPopupComponent implements OnInit {

  successful: Map<string, string> = new Map<string, string>();
  failed: Map<string, string> = new Map<string, string>();

  @Input()
  set deviceCreateStates(deviceCreateStates: Map<string, string>) {
    deviceCreateStates.forEach((state: string, id: string) => {
      if (state === 'ok') {
        this.successful.set(id, state);
      } else {
        this.failed.set(id, state);
      }
    });
  }
  @Input() errorMessage: string;

  constructor(
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }


}
