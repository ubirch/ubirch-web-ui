import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ImportPage } from './import.page';
import { ImportFormComponent } from './components/import-form/import-form.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ImportPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ImportPage,
    ImportFormComponent,
  ],
})
export class ImportPageModule {}
