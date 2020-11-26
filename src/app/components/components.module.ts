import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {FileInputComponent} from './file-input/file-input.component';
import {VerificationHeaderComponent} from './header/verification-header/verification-header.component';
import {LoggedInUserComponent} from './logged-in-user/logged-in-user.component';
import {TranslateModule} from '@ngx-translate/core';
import {VerificationErrorHandlingComponent} from './verification-error-handling/verification-error-handling.component';
import {VerificationQuickInfoComponent} from './verification-quick-info/verification-quick-info.component';
import {VerificationGraphComponent} from './verification-graph/verification-graph.component';
import {CytoscapeGraphModule} from '../cytoscape-graph/cytoscape-graph.module';
import {TagListInputComponent} from './tag-list-input/tag-list-input.component';
import {ExpandableComponent} from './expandable/expandable.component';
import {LanguageSelectComponent} from "./language-select/language-select.component";


@NgModule({
    declarations: [
        HeaderComponent,
        VerificationHeaderComponent,
        LoggedInUserComponent,
        FileInputComponent,
        VerificationErrorHandlingComponent,
        VerificationQuickInfoComponent,
        VerificationGraphComponent,
        TagListInputComponent,
        ExpandableComponent,
        ExpandableComponent,
        LanguageSelectComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CytoscapeGraphModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    VerificationHeaderComponent,
    LoggedInUserComponent,
    FileInputComponent,
    VerificationErrorHandlingComponent,
    VerificationQuickInfoComponent,
    VerificationGraphComponent,
    TagListInputComponent,
    ExpandableComponent,
    ExpandableComponent
  ]
})
export class ComponentsModule {
}
