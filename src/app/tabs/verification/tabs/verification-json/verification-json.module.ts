import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {VerificationJsonPage} from './verification-json.page';
import {PrettyJsonModule} from 'angular2-prettyjson';
import {ComponentsModule} from '../../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: VerificationJsonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrettyJsonModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [VerificationJsonPage]
})
export class VerificationJsonPageModule {
}
