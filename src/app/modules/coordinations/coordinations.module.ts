import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinationsComponent } from './coordinations/coordinations.component';
import { CoordinationComponent } from './coordination/coordination.component';
import { CoordinationViewComponent } from './coordination-view/coordination-view.component';



@NgModule({
  declarations: [
    CoordinationsComponent,
    CoordinationComponent,
    CoordinationViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoordinationsModule { }
