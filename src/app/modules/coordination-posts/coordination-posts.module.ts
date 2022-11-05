import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinationPostComponent } from './coordination-post/coordination-post.component';
import { CoordinationPostsComponent } from './coordination-posts/coordination-posts.component';
import { CoordinationPostViewComponent } from './coordination-post-view/coordination-post-view.component';



@NgModule({
  declarations: [
    CoordinationPostComponent,
    CoordinationPostsComponent,
    CoordinationPostViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoordinationPostsModule { }
