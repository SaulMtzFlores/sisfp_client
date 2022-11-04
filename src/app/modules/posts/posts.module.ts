import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinationPostsComponent } from './coordination-posts/coordination-posts.component';
import { CoursePostsComponent } from './course-posts/course-posts.component';
import { CoordinationPostsViewComponent } from './coordination-posts-view/coordination-posts-view.component';
import { CoursePostsViewComponent } from './course-posts-view/course-posts-view.component';



@NgModule({
  declarations: [
    CoordinationPostsComponent,
    CoursePostsComponent,
    CoordinationPostsViewComponent,
    CoursePostsViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PostsModule { }
