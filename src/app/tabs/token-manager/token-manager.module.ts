import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokenManagerPage } from './token-manager.page';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsModule} from '../../components/components.module';
import {TranslateModule} from '@ngx-translate/core';
import {BrowserModule} from '@angular/platform-browser';
import {NewTokenPopupComponent} from "./popups/new-token-popup/new-token-popup.component";

const routes: Routes = [
  {
    path: '',
    component: TokenManagerPage
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [TokenManagerPage, NewTokenPopupComponent],
  entryComponents: [NewTokenPopupComponent]
})
export class TokenManagerPageModule {}
