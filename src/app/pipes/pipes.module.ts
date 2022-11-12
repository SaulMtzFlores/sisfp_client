import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from './date.pipe';
import { SecmsPipe } from './secms.pipe';
import { IdFieldPipe } from './id-field.pipe';

const Pipes = [
  DatePipe,
  SecmsPipe,
  IdFieldPipe
]

@NgModule({
  declarations: Pipes,
  exports: Pipes,
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
