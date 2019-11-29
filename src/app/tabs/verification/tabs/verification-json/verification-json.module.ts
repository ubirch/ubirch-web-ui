import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerificationJsonPage } from './verification-json.page';
import {PrettyJsonModule} from 'angular2-prettyjson';

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
    RouterModule.forChild(routes)
  ],
  declarations: [VerificationJsonPage]
})
export class VerificationJsonPageModule {}
