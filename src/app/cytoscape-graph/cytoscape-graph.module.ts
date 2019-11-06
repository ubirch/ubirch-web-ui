import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgCytoComponent} from './ng-cyto.component';

@NgModule({
  declarations: [
    NgCytoComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgCytoComponent
  ]
})
export class CytoscapeGraphModule { }
