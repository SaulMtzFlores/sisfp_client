import { Routes } from "@angular/router";
import { Guard } from "app/guards/guard";
import { RecoverComponent } from "app/modules/auth/recover/recover.component";
import { RedeemComponent } from "app/modules/auth/redeem/redeem.component";
import { SignInComponent } from "app/modules/auth/sign-in/sign-in.component";
import { SignUpComponent } from "app/modules/auth/sign-up/sign-up.component";

export const AuthLayoutRoutes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate:[Guard]
   },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate:[Guard]
  },
  {
    path: 'redeem',
    component: RedeemComponent,
    canActivate:[Guard]
  },
  {
    path: 'recover',
    component: RecoverComponent,
    canActivate:[Guard]
  },
  { path: '**', pathMatch:'full', redirectTo: 'sign-in'}
]
