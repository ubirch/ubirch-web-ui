import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeviceLastUPPPage } from './device-last-upp.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceLastUPPPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeviceLastUPPPage]
})
export class DeviceLastUPPPageModule {}
