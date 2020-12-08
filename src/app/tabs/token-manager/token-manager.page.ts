import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HeaderActionButton } from '../../components/header/header-action-button';
import { UbirchAccountingToken } from '../../models/ubirch-accounting-token';
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
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.getTokens();
    console.log(this.tokens);
  }

  async createTokenPopup() {
    const modal = await this.modalController.create({
      component: NewTokenPopupComponent,
    });
    return await modal.present();

  }

  search(event: any) {
    // TODO
  }

  getTokens() {
    this.tokenService.getAllTokens().subscribe((tokenList: UbirchAccountingToken[]) =>
      this.tokens = tokenList
    );
  }

  get CURRENT_LANG(): string {
    return this.translateService.currentLang;
  }


}
