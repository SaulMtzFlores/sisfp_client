import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignInComponent } from './sign-in/sign-in.component';



@NgModule({
  declarations: [

    SignUpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SignInComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
