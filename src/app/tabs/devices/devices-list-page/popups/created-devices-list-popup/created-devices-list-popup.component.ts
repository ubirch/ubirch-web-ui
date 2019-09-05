import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-created-devices-list-popup',
  templateUrl: './created-devices-list-popup.component.html',
  styleUrls: ['./created-devices-list-popup.component.scss'],
})
export class CreatedDevicesListPopupComponent implements OnInit {

  private successful: Map<string, string> = new Map<string, string>();
  private failed: Map<string, string>;

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

  close() {
    this.modalCtrl.dismiss();
  }

}
