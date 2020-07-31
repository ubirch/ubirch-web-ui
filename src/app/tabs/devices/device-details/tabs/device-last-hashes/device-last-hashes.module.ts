import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeviceLastHashesPage } from './device-last-hashes.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceLastHashesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeviceLastHashesPage]
})
export class DeviceLastHashesPageModule {}
