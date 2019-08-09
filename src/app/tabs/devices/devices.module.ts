import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DevicesListPage } from './devices-list-page.component';
import {ComponentsModule} from '../../components/components.module';
import {MaterialModule} from '../../components/material-components/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DevicesListPage
      }
    ]),
    ComponentsModule
  ],
  declarations: [DevicesListPage]
})
export class ListPageModule {}
