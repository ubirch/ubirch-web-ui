import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerificationTabsPage } from './verification-tabs.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: VerificationTabsPage,
    children: [
      {
        path: '',
        redirectTo: 'graph',
        pathMatch: 'full',
      },
      {
        path: 'graph',
        loadChildren: () => import('./verification-graph/verification-graph.module').then(m => m.VerificationGraphPageModule)
      },
      {
        path: 'json',
        loadChildren: () => import('./verification-json/verification-json.module').then(m => m.VerificationJsonPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/graph',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [VerificationTabsPage]
})
export class VerificationTabsPageModule {}
