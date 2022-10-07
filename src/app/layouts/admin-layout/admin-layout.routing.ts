import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { SignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from 'app/modules/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'app/modules/auth/reset-password/reset-password.component';
import { UsersComponent } from 'app/modules/users/users/users.component';
import { UserViewComponent } from 'app/modules/users/user-view/user-view.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    {
      path: 'auth',
      loadChildren: () => import('../../modules/auth/auth.module').then(m=> m.AuthModule),
      children: [
        { path: '', pathMatch: 'full', redirectTo:'sign-in' },
        {
          path: 'sign-in',
          component: SignInComponent
        },
        {
          path: 'sign-up',
          component: SignUpComponent
        },
        {
          path: 'forgot-password',
          component: ForgotPasswordComponent
        },
        {
          path: 'reset-password',
          component: ResetPasswordComponent
        }
      ]
    },
    {
      path: 'users',
      loadChildren: () => import('../../modules/users/users.module').then(m => m.UsersModule),
      children: [
        {
          path: '',
          component: UsersComponent
        },
        {
          path: 'add',
          component: UserComponent
        },
        {
          path: 'see/:id',
          component: UserViewComponent
        },
        {
          path: 'edit/:id',
          component: UserComponent
        }
      ]
    },
    { path: '**', pathMatch:'full', redirectTo: 'dashboard'}
];
