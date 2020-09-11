import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';

import { IonicModule } from '@ionic/angular';

import { DeviceSettingsPage } from './device-settings.page';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';

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
        TagInputModule,
        RouterModule.forChild(routes),
        TranslateModule
    ],
  declarations: [DeviceSettingsPage]
})
export class DeviceSettingsPageModule {}
