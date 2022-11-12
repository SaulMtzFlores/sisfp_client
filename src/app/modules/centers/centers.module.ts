import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterComponent } from './center/center.component';
import { CentersComponent } from './centers/centers.component';
import { CenterViewComponent } from './center-view/center-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'app/pipes/pipes.module';



@NgModule({
  declarations: [
    CenterComponent,
    CentersComponent,
    CenterViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule
  ]
})
export class CentersModule { }
