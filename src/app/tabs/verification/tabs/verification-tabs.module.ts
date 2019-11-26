import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerificationTabsPage } from './verification-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationTabsPage,
    children: [
      {
        path: '',
        redirectTo: 'json',
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
    redirectTo: 'tabs/json',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerificationTabsPage]
})
export class VerificationTabsPageModule {}
