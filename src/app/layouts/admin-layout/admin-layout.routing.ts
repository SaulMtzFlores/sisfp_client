import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

import { UsersComponent } from 'app/modules/users/users/users.component';
import { UserViewComponent } from 'app/modules/users/user-view/user-view.component';
import { HomeComponent } from 'app/modules/landing/home/home.component';
import { CoordinationPostsComponent } from 'app/modules/posts/coordination-posts/coordination-posts.component';
import { CoursePostsComponent } from 'app/modules/posts/course-posts/course-posts.component';
import { CoordinationsComponent } from 'app/modules/coordinations/coordinations/coordinations.component';
import { CoordinationComponent } from 'app/modules/coordinations/coordination/coordination.component';
import { CoordinationViewComponent } from 'app/modules/coordinations/coordination-view/coordination-view.component';

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
    {
      path: 'posts',
      loadChildren: () => import('../../modules/posts/posts.module').then(m => m.PostsModule),
      children: [
        {
          path: 'coordination/:id',
          component: CoordinationPostsComponent
        },
        {
          path: 'course/:id',
          component: CoursePostsComponent
        },
        { path: '**', pathMatch: 'full', redirectTo:'home'}
      ]
    },
    {
      path: 'coordinations',
      loadChildren: () => import('../../modules/coordinations/coordinations.module').then(m => m.CoordinationsModule),
      children: [
        {
          path: '',
          component: CoordinationsComponent
        },
        {
          path: 'see/:id',
          component: CoordinationViewComponent
        },
        { path: '**', pathMatch: 'full', redirectTo:'coordinations'}
      ]
    },
    {
      path: 'home',
      loadChildren: () => import('../../modules/landing/landing.module').then(m => m.LandingModule),
      children: [
        {
          path: '',
          component: HomeComponent
        }
      ]
    },
    { path: '**', pathMatch:'full', redirectTo: 'home'}
];
