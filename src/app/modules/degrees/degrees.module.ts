import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeComponent } from './degree/degree.component';
import { DegreesComponent } from './degrees/degrees.component';
import { DegreeViewComponent } from './degree-view/degree-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'app/pipes/pipes.module';



@NgModule({
  declarations: [
    DegreeComponent,
    DegreesComponent,
    DegreeViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule
  ]
})
export class DegreesModule { }
