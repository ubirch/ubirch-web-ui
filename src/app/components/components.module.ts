import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {FileInputComponent} from './file-input/file-input.component';
import {VerificationHeaderComponent} from './header/verification-header/verification-header.component';
import {LoggedInUserComponent} from './logged-in-user/logged-in-user.component';
import {TranslateModule} from '@ngx-translate/core';
import {VerificationErrorHandlingComponent} from './verification-error-handling/verification-error-handling.component';


@NgModule({
  declarations: [
    HeaderComponent,
    VerificationHeaderComponent,
    LoggedInUserComponent,
    FileInputComponent,
    VerificationErrorHandlingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent,
    VerificationHeaderComponent,
    LoggedInUserComponent,
    FileInputComponent,
    VerificationErrorHandlingComponent
  ]
})
export class ComponentsModule {
}
