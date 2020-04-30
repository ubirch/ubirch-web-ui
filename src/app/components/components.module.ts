import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { FileInputComponent } from './file-input/file-input.component';



@NgModule({
  declarations: [
      HeaderComponent,
      FileInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
      HeaderComponent,
      FileInputComponent
  ]
})
export class ComponentsModule { }
