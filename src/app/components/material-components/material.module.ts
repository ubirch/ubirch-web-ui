import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
