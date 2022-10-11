import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const AppRoutes: Routes = [
  {
    path: 'academics',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
    }]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m=> m.AuthLayoutModule)
    }]},
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'auth'
  }
]
