import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {VerificationPage} from './verification.page';
import {ComponentsModule} from '../../components/components.module';
import {CytoscapeGraphModule} from '../../cytoscape-graph/cytoscape-graph.module';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: VerificationPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./tabs/verification-tabs.module').then(m => m.VerificationTabsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CytoscapeGraphModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    TranslateModule
  ],
  declarations: [
    VerificationPage
  ]
})
export class VerificationPageModule {
}
