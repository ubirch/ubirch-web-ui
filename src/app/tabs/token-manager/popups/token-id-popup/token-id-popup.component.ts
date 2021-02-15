import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-token-id-popup',
  templateUrl: './token-id-popup.component.html',
  styleUrls: ['./token-id-popup.component.scss'],
})
export class TokenIdPopupComponent implements OnInit {
  tokenId;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  public dismiss(): void {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }
}
