import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountProfilePage } from './account-profile.page';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: AccountProfilePage
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
        ReactiveFormsModule
    ],
  declarations: [AccountProfilePage]
})
export class AccountProfilePageModule {}
