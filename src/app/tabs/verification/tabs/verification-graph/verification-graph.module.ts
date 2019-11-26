import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerificationGraphPage } from './verification-graph.page';
import {CytoscapeGraphModule} from '../../../../cytoscape-graph/cytoscape-graph.module';

const routes: Routes = [
  {
    path: '',
    component: VerificationGraphPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CytoscapeGraphModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerificationGraphPage]
})
export class VerificationGraphPageModule {}
