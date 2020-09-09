import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DeviceDetailsPage } from './device-details.page';
import {DeviceDetailsTabsRoutingModule} from './device-details.tabs-routering.module';
import {ComponentsModule} from '../../../components/components.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceDetailsTabsRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [
      DeviceDetailsPage
  ]
})
export class DeviceDetailsPageModule {}
