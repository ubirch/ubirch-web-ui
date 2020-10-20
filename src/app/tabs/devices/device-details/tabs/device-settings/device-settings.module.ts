import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeviceSettingsPage } from './device-settings.page';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../../../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: DeviceSettingsPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule,
        ComponentsModule
    ],
  declarations: [DeviceSettingsPage]
})
export class DeviceSettingsPageModule {}
