import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserViewComponent } from './user-view/user-view.component';
import { PipesModule } from 'app/pipes/pipes.module';



@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    UserViewComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ]
})
export class UsersModule { }
