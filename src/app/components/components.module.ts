import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { FileInputComponent } from './file-input/file-input.component';
import {VerificationHeaderComponent} from './header/verification-header/verification-header.component';



@NgModule({
  declarations: [
      HeaderComponent,
      VerificationHeaderComponent,
      FileInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
      HeaderComponent,
      VerificationHeaderComponent,
      FileInputComponent
  ]
})
export class ComponentsModule { }
