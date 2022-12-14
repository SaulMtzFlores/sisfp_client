import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './subject/subject.component';
import { SubjectViewComponent } from './subject-view/subject-view.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'app/pipes/pipes.module';



@NgModule({
  declarations: [
    SubjectComponent,
    SubjectViewComponent,
    SubjectsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule
  ]
})
export class SubjectModule { }
