import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterComponent } from './center/center.component';
import { CentersComponent } from './centers/centers.component';
import { CenterViewComponent } from './center-view/center-view.component';



@NgModule({
  declarations: [
    CenterComponent,
    CentersComponent,
    CenterViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CentersModule { }
