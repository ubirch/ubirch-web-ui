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
import {VerificationQuickInfoComponent} from './verification-quick-info/verification-quick-info.component';
import {VerificationGraphComponent} from './verification-graph/verification-graph.component';
import {CytoscapeGraphModule} from '../cytoscape-graph/cytoscape-graph.module';


@NgModule({
  declarations: [
    HeaderComponent,
    VerificationHeaderComponent,
    LoggedInUserComponent,
    FileInputComponent,
    VerificationErrorHandlingComponent,
    VerificationQuickInfoComponent,
    VerificationGraphComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CytoscapeGraphModule
  ],
  exports: [
    HeaderComponent,
    VerificationHeaderComponent,
    LoggedInUserComponent,
    FileInputComponent,
    VerificationErrorHandlingComponent,
    VerificationQuickInfoComponent,
    VerificationGraphComponent
  ]
})
export class ComponentsModule {
}
