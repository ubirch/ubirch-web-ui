import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { FileInputComponent } from './file-input/file-input.component';
import {VerificationHeaderComponent} from './header/verification-header/verification-header.component';
import {LoggedInUserComponent} from './logged-in-user/logged-in-user.component';
import {TagChipsListInputComponent} from './tag-chips-list-input/tag-chips-list-input.component';



@NgModule({
  declarations: [
      HeaderComponent,
      VerificationHeaderComponent,
      LoggedInUserComponent,
      FileInputComponent,
      TagChipsListInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
      HeaderComponent,
      VerificationHeaderComponent,
      LoggedInUserComponent,
      FileInputComponent,
      TagChipsListInputComponent
  ]
})
export class ComponentsModule { }
