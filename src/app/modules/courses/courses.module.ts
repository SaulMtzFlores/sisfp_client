import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { CourseViewComponent } from './course-view/course-view.component';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
    CourseViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoursesModule { }
