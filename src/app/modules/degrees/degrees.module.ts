import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeComponent } from './degree/degree.component';
import { DegreesComponent } from './degrees/degrees.component';
import { DegreeViewComponent } from './degree-view/degree-view.component';



@NgModule({
  declarations: [
    DegreeComponent,
    DegreesComponent,
    DegreeViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DegreesModule { }
