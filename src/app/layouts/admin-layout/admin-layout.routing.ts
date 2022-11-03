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
import { CoursesComponent } from 'app/modules/courses/courses/courses.component';
import { CourseViewComponent } from 'app/modules/courses/course-view/course-view.component';
import { CourseComponent } from 'app/modules/courses/course/course.component';
import { Guard } from 'app/guards/guard';

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
          component: UsersComponent,
          canActivate: [Guard]
        },
        {
          path: 'add',
          component: UserComponent,
          canActivate: [Guard]
        },
        {
          path: 'see/:id',
          component: UserViewComponent,
          canActivate: [Guard]
        },
        {
          path: 'edit/:id',
          component: UserComponent,
          canActivate: [Guard]
        }
      ]
    },
    {
      path: 'posts',
      loadChildren: () => import('../../modules/posts/posts.module').then(m => m.PostsModule),
      children: [
        {
          path: 'coordination/:id',
          component: CoordinationPostsComponent,
          canActivate: [Guard]
        },
        {
          path: 'course/:id',
          component: CoursePostsComponent,
          canActivate: [Guard]
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
          component: CoordinationsComponent,
          canActivate: [Guard]
        },
        {
          path: 'see/:id',
          component: CoordinationViewComponent,
          canActivate: [Guard]
        },
        {
          path: 'edit/:id',
          component: CoordinationComponent,
          canActivate: [Guard]
        },
        { path: '**', pathMatch: 'full', redirectTo:'coordinations'}
      ]
    },
    {
      path: 'courses',
      loadChildren: () => import('../../modules/courses/courses.module').then(m => m.CoursesModule),
      children: [
        {
          path: '',
          component: CoursesComponent,
          canActivate: [Guard]
        },
        {
          path: 'see/:id',
          component: CourseViewComponent,
          canActivate: [Guard]
        },
        {
          path: 'edit/:id',
          component: CourseComponent,
          canActivate: [Guard]
        },
        {
          path: 'add',
          component: CourseComponent,
          canActivate: [Guard]
        },
        { path: '**', pathMatch:'full', redirectTo: 'courses'}
      ]
    },
    {
      path: 'home',
      loadChildren: () => import('../../modules/landing/landing.module').then(m => m.LandingModule),
      children: [
        {
          path: '',
          component: HomeComponent,
          canActivate: [Guard]
        }
      ]
    },
    { path: '**', pathMatch:'full', redirectTo: 'home'}
];
