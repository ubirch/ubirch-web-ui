import { Component, OnInit } from '@angular/core';
import {NgxQrcodeElementTypes} from '@techiediaries/ngx-qrcode';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-token-qr-code-popup',
  templateUrl: './token-qr-code-popup.component.html',
  styleUrls: ['./token-qr-code-popup.component.scss'],
})
export class TokenQrCodePopupComponent implements OnInit {
  qrData;
  elementType = NgxQrcodeElementTypes.CANVAS;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  public dismiss(): void {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }

}
