import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { NewTokenPopupComponent } from './popups/new-token-popup/new-token-popup.component';

import { TokenManagerPage } from './token-manager.page';

const routes: Routes = [
  {
    path: '',
    component: TokenManagerPage,
  },
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
  declarations: [
    TokenManagerPage,
    NewTokenPopupComponent
  ],
  entryComponents: [
    NewTokenPopupComponent
  ],
})
export class TokenManagerPageModule {}
