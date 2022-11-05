import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursePostComponent } from './course-post/course-post.component';
import { CoursePostsComponent } from './course-posts/course-posts.component';
import { CoursePostViewComponent } from './course-post-view/course-post-view.component';



@NgModule({
  declarations: [
    CoursePostComponent,
    CoursePostsComponent,
    CoursePostViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoursesPostsModule { }
