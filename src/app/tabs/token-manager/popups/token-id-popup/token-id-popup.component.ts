import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {UbirchWebUIUtilsService} from '../../../../utils/ubirch-web-uiutils.service';
import {ToastType} from '../../../../enums/toast-type.enum';
import {ToastService} from '../../../../services/toast.service';

@Component({
  selector: 'app-token-id-popup',
  templateUrl: './token-id-popup.component.html',
  styleUrls: ['./token-id-popup.component.scss'],
})
export class TokenIdPopupComponent implements OnInit {
  tokenId;

  constructor(private modalCtrl: ModalController, private translateService: TranslateService, private toast: ToastService,) {
  }

  ngOnInit() {
  }

  public dismiss(): void {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }

  get CURRENT_LANG(): string {
    return this.translateService.currentLang;
  }

  copyToClipboard(val: string) {
    UbirchWebUIUtilsService.copyToClipboard(val);
    this.toast.openToast(ToastType.light, 'toast.token.copy', 2000);
  }
}
