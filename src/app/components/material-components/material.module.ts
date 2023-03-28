import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
