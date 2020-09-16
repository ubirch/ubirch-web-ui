import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {VerificationGraphPage} from './verification-graph.page';
import {ComponentsModule} from '../../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: VerificationGraphPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [VerificationGraphPage]
})
export class VerificationGraphPageModule {
}
