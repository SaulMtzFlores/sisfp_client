import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { GroupComponent } from './group/group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'app/pipes/pipes.module';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostViewComponent } from './post-view/post-view.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    GroupsComponent,
    GroupViewComponent,
    GroupComponent,
    PostsComponent,
    PostComponent,
    PostViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
    NgxDropzoneModule
  ]
})
export class GroupsModule { }
