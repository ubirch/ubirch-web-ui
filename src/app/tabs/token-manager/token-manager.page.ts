import {Component, OnInit} from '@angular/core';
import {HeaderActionButton} from '../../components/header/header-action-button';
import {UserService} from '../../services/user.service';
import {log} from 'util';
import {map} from 'rxjs/operators';
import {DataSetResponse} from '../../models/data-set-response';
import {DataSet} from '../../models/data-set';
import {HttpClient} from '@angular/common/http';
import {ModalController} from '@ionic/angular';
import {NewTokenPopupComponent} from './popups/new-token-popup/new-token-popup.component';
import {TokenService} from '../../services/token.service';

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
        action: 'addToken'
    })];

    private tokens;

    constructor(private tokenService: TokenService, public modalController: ModalController) {
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
        // this.tokenService.getTokens();
        // TODO
    }

}
