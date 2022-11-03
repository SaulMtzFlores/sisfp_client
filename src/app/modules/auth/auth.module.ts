import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RedeemComponent } from './redeem/redeem.component';
import { RecoverComponent } from './recover/recover.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    RedeemComponent,
    RecoverComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
