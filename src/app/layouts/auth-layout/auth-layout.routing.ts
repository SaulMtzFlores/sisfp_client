import { Routes } from "@angular/router";
import { ForgotPasswordComponent } from "app/modules/auth/forgot-password/forgot-password.component";
import { RecoverComponent } from "app/modules/auth/recover/recover.component";
import { RedeemComponent } from "app/modules/auth/redeem/redeem.component";
import { ResetPasswordComponent } from "app/modules/auth/reset-password/reset-password.component";
import { SignInComponent } from "app/modules/auth/sign-in/sign-in.component";
import { SignUpComponent } from "app/modules/auth/sign-up/sign-up.component";

export const AuthLayoutRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'redeem', component: RedeemComponent },
  { path: 'recover', component: RecoverComponent },
  { path: '**', pathMatch:'full', redirectTo: 'sign-in'}
]
