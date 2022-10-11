import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostViewComponent } from './post-view/post-view.component';
import { CoordinationPostsComponent } from './coordination-posts/coordination-posts.component';
import { CoursePostsComponent } from './course-posts/course-posts.component';



@NgModule({
  declarations: [
    PostViewComponent,
    CoordinationPostsComponent,
    CoursePostsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PostsModule { }
