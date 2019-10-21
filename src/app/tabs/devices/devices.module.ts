import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DevicesListPage } from './devices-list-page/devices-list-page.component';
import {ComponentsModule} from '../../components/components.module';
import {MaterialModule} from '../../components/material-components/material.module';
import {DeviceDetailsComponent} from './device-details_/device-details.component';
import {MarkdownModule} from 'ngx-markdown';
import {NewDevicePopupComponent} from './devices-list-page/popups/new-device-popup/new-device-popup.component';
import {ConfirmDeleteDevicePopupComponent} from './devices-list-page/popups/confirm-delete-device-popup/confirm-delete-device-popup.component';
import {CreatedDevicesListPopupComponent} from './devices-list-page/popups/created-devices-list-popup/created-devices-list-popup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    MarkdownModule.forChild(),
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
            loadChildren: './device-details/device-details.module#DeviceDetailsPageModule'
          }]
      }
    ]),
    ComponentsModule
  ],
  declarations: [
    DevicesListPage,
    DeviceDetailsComponent,
    NewDevicePopupComponent,
    ConfirmDeleteDevicePopupComponent,
    CreatedDevicesListPopupComponent
  ],
  entryComponents: [
    NewDevicePopupComponent,
    ConfirmDeleteDevicePopupComponent,
    CreatedDevicesListPopupComponent
  ]
})
export class ListPageModule {}
