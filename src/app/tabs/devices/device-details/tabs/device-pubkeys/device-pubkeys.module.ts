import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DevicePubkeysPage } from './device-pubkeys.page';

const routes: Routes = [
  {
    path: '',
    component: DevicePubkeysPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DevicePubkeysPage]
})
export class DevicePubkeysPageModule {}
