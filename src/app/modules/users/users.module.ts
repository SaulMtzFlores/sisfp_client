import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserViewComponent } from './user-view/user-view.component';



@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    UserViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
