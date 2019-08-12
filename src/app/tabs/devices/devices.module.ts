import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DevicesListPage } from './devices-list-page/devices-list-page.component';
import {ComponentsModule} from '../../components/components.module';
import {MaterialModule} from '../../components/material-components/material.module';
import {DeviceDetailsComponent} from './device-details/device-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: DevicesListPage
      },
      {
        path: 'details',
        children: [
          {
            path: ':id',
            component: DeviceDetailsComponent
          }]
      }
    ]),
    ComponentsModule
  ],
  declarations: [
      DevicesListPage,
    DeviceDetailsComponent
  ]
})
export class ListPageModule {}
