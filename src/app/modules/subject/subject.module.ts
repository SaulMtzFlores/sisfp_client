import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './subject/subject.component';
import { SubjectViewComponent } from './subject-view/subject-view.component';
import { SubjectsComponent } from './subjects/subjects.component';



@NgModule({
  declarations: [
    SubjectComponent,
    SubjectViewComponent,
    SubjectsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SubjectModule { }
