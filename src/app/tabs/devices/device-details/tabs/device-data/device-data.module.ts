import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeviceDataPage } from './device-data.page';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from "../../../../../components/components.module";

const routes: Routes = [
  {
    path: '',
    component: DeviceDataPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule,
        ComponentsModule
    ],
  declarations: [DeviceDataPage]
})
export class DeviceDataPageModule {}
