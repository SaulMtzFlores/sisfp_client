import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterComponent } from './center/center.component';
import { CentersComponent } from './centers/centers.component';
import { CenterViewComponent } from './center-view/center-view.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CenterComponent,
    CentersComponent,
    CenterViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CentersModule { }
