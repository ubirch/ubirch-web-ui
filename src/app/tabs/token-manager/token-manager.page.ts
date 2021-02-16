import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {HeaderActionButton} from '../../components/header/header-action-button';
import {ToastType} from '../../enums/toast-type.enum';
import {UbirchAccountingToken} from '../../models/ubirch-accounting-token';
import {ToastService} from '../../services/toast.service';
import {TokenService} from '../../services/token.service';
import {NewTokenPopupComponent} from './popups/new-token-popup/new-token-popup.component';
import {UbirchWebUIUtilsService} from '../../utils/ubirch-web-uiutils.service';
import {TokenQrCodePopupComponent} from './popups/token-qr-code-popup/token-qr-code-popup.component';
import {TokenIdPopupComponent} from './popups/token-id-popup/token-id-popup.component';
import {DeviceService} from '../../services/device.service';


@Component({
  selector: 'app-token-manager',
  templateUrl: './token-manager.page.html',
  styleUrls: ['./token-manager.page.scss'],
})
export class TokenManagerPage implements OnInit {
  actionButtons = [new HeaderActionButton({
    color: 'success',
    labelKey: 'action-button.token.create',
    iconName: 'add-circle-outline',
    action: 'addToken',
  }) ];

  private tokens: UbirchAccountingToken[] = [];
  private devices;

  get CURRENT_LANG(): string {
    return this.translateService.currentLang;
  }

  constructor(
      private tokenService: TokenService,
      public modalController: ModalController,
      public alertController: AlertController,
      private translateService: TranslateService,
      private toast: ToastService,
      private deviceService: DeviceService,
  ) {
  }

  ngOnInit() {
    this.getTokens();
    this.getDevices();
  }

  async createTokenPopup() {
    const modal = await this.modalController.create({
      component: NewTokenPopupComponent,
    });

    modal.onDidDismiss().then((details: any) => {
      if (details && details.data) {
        this.tokenService.createToken(
          details.data,
        ).then(
          (token: UbirchAccountingToken) => {
            if (token) {
              this.toast.openToast(ToastType.success, 'toast.token.created.successfully', 4000);
              this.getTokens();
            }
          },
        ).catch(_ => {
          // nothing to do in UI on error during token creation
        });

      } else {
        this.toast.openToast(ToastType.light, 'toast.token.creation.canceled', 4000);
      }
    });

    return await modal.present();

  }

  async qrCodePopup(dataP) {
    const modal = await this.modalController.create({
      component: TokenQrCodePopupComponent,
      componentProps: {
        qrData: dataP,
      }
    });

    return await modal.present();
  }

  async tokenIdPopup(tokenIdP) {
    const modal = await this.modalController.create({
      component: TokenIdPopupComponent,
      componentProps: {
        tokenId: tokenIdP
      }
    });
    return await modal.present();
  }

  async presentThings(things: string) {
    let message: string;
    for (const thing of things) {
      for (const device of this.devices) {
        if (thing === device.hwDeviceId) {
          if (message) {
            message = message + '<br>' + device.description;
          } else {
            message = device.description;
          }
        }
      }

    }
    const alert = await this.alertController.create({
      cssClass: 'thingAlert',
      header: 'Target Things for this Token',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  private getDevices(): void {
    this.deviceService.reloadDeviceStubs(
        0,
        1000,
    ).toPromise().then(
        wrapper => {
          this.devices = wrapper.devices || [];
        }
    ).catch(error => {
          // TODO: handle error
        }
    );
  }

  search(event: any) {
    // TODO
  }

  getTokens() {
    this.tokenService.getAllTokens().toPromise().then((tokenList: UbirchAccountingToken[]) => {
          this.tokens = tokenList;
        }
    );
  }

  copyToClipboard(val: string) {
    UbirchWebUIUtilsService.copyToClipboard(val);
    this.toast.openToast(ToastType.light, 'toast.token.copy', 2000);
  }

  revokeToken() {
    this.tokenService.revokeToken();
  }

}
