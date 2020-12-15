import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'util';
import { HeaderActionButton } from '../../components/header/header-action-button';
import { ToastType } from '../../enums/toast-type.enum';
import { UbirchAccountingToken } from '../../models/ubirch-accounting-token';
import { LoggingService } from '../../services/logging.service';
import { ToastService } from '../../services/toast.service';
import { TokenService } from '../../services/token.service';
import { NewTokenPopupComponent } from './popups/new-token-popup/new-token-popup.component';

@Component({
  selector: 'app-token-manager',
  templateUrl: './token-manager.page.html',
  styleUrls: [ './token-manager.page.scss' ],
})
export class TokenManagerPage implements OnInit {
  actionButtons = [ new HeaderActionButton({
    color: 'success',
    labelKey: 'action-button.token.create',
    iconName: 'add-circle-outline',
    action: 'addToken',
  }) ];

  private tokens: UbirchAccountingToken[] = [];

  constructor(
    private tokenService: TokenService,
    public modalController: ModalController,
    private translateService: TranslateService,
    private toast: ToastService,
    private logger: LoggingService
  ) {
  }

  ngOnInit() {
    this.getTokens();
  }

  async createTokenPopup() {
    const modal = await this.modalController.create({
      component: NewTokenPopupComponent,
    });

    modal.onDidDismiss().then((details: any) => {
      if (details && details.data) {
        this.tokenService.createToken(
          details.data
        ).then(
          (_: UbirchAccountingToken) => {
            this.toast.openToast(ToastType.success, 'toast.token.created.successfully', 4000);
            this.getTokens();
          }
        ).catch(err => {
          this.logger.log('TODO: handle error on token creation in UI');
          // TODO: handle error on token creation in UI
        });

      } else {
        this.toast.openToast(ToastType.light, 'toast.token.creation.canceled', 4000);
      }
    });

    return await modal.present();

  }

  search(event: any) {
    // TODO
  }

  getTokens() {
    this.tokenService.getAllTokens().toPromise().then((tokenList: UbirchAccountingToken[]) =>
      this.tokens = tokenList
    );
  }

  get CURRENT_LANG(): string {
    return this.translateService.currentLang;
  }


}
