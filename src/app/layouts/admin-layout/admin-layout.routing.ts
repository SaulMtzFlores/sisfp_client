import { Routes } from '@angular/router';
import { UsersComponent } from 'app/modules/users/users/users.component';
import { UserViewComponent } from 'app/modules/users/user-view/user-view.component';
import { HomeComponent } from 'app/modules/landing/home/home.component';
import { CoordinationsComponent } from 'app/modules/coordinations/coordinations/coordinations.component';
import { CoordinationComponent } from 'app/modules/coordinations/coordination/coordination.component';
import { CoordinationViewComponent } from 'app/modules/coordinations/coordination-view/coordination-view.component';
import { CoursesComponent } from 'app/modules/courses/courses/courses.component';
import { CourseViewComponent } from 'app/modules/courses/course-view/course-view.component';
import { CourseComponent } from 'app/modules/courses/course/course.component';
import { Guard } from 'app/guards/guard';
import { CoordinationPostsComponent } from 'app/modules/coordination-posts/coordination-posts/coordination-posts.component';
import { CoordinationPostViewComponent } from 'app/modules/coordination-posts/coordination-post-view/coordination-post-view.component';
import { CoordinationPostComponent } from 'app/modules/coordination-posts/coordination-post/coordination-post.component';
import { CoursePostsComponent } from 'app/modules/courses-posts/course-posts/course-posts.component';
import { CoursePostViewComponent } from 'app/modules/courses-posts/course-post-view/course-post-view.component';
import { CoursePostComponent } from 'app/modules/courses-posts/course-post/course-post.component';
import { UserComponent } from 'app/modules/users/user/user.component';
import { CentersComponent } from 'app/modules/centers/centers/centers.component';
import { CenterComponent } from 'app/modules/centers/center/center.component';
import { CenterViewComponent } from 'app/modules/centers/center-view/center-view.component';
import { DegreesComponent } from 'app/modules/degrees/degrees/degrees.component';
import { DegreeViewComponent } from 'app/modules/degrees/degree-view/degree-view.component';
import { DegreeComponent } from 'app/modules/degrees/degree/degree.component';
import { SubjectsComponent } from 'app/modules/subject/subjects/subjects.component';
import { SubjectViewComponent } from 'app/modules/subject/subject-view/subject-view.component';
import { SubjectComponent } from 'app/modules/subject/subject/subject.component';

export const AdminLayoutRoutes: Routes = [
    {
      path: 'users',
      loadChildren: () => import('../../modules/users/users.module').then(m => m.UsersModule),
      children: [
        { path: '', component: UsersComponent, canActivate: [Guard] },
        { path: 'add', component: UserComponent, canActivate: [Guard] },
        { path: 'see/:id', component: UserViewComponent, canActivate: [Guard] },
        { path: 'edit/:id', component: UserComponent, canActivate: [Guard] }
      ]
    },
    {
      path: 'coordinations',
      loadChildren: () => import('../../modules/coordinations/coordinations.module').then(m => m.CoordinationsModule),
      children: [
        { path: '', component: CoordinationsComponent, canActivate: [Guard] },
        { path: 'see/:id', component: CoordinationViewComponent, canActivate: [Guard] },
        { path: 'edit/:id', component: CoordinationComponent, canActivate: [Guard] },
        { path: 'add', component: CoordinationComponent, canActivate: [Guard], },
        {
          path: 'posts',
          loadChildren: () => import('../../modules/coordination-posts/coordination-posts.module').then(m => m.CoordinationPostsModule),
          children: [
            { path: '', component: CoordinationPostsComponent, canActivate: [Guard] },
            { path: 'see/:id', component: CoordinationPostViewComponent, canActivate: [Guard] },
            { path: 'add', component: CoordinationPostComponent, canActivate: [Guard] }
          ]
        },
        { path: '**', pathMatch: 'full', redirectTo:'coordinations'}
      ]
    },
    {
      path: 'courses',
      loadChildren: () => import('../../modules/courses/courses.module').then(m => m.CoursesModule),
      children: [
        { path: '', component: CoursesComponent, canActivate: [Guard] },
        { path: 'see/:id', component: CourseViewComponent, canActivate: [Guard] },
        { path: 'edit/:id', component: CourseComponent, canActivate: [Guard] },
        { path: 'add', component: CourseComponent, canActivate: [Guard] },
        {
          path: 'posts',
          loadChildren: () => import('../../modules/courses-posts/courses-posts.module').then(m => m.CoursesPostsModule),
          children: [
            { path: '', component: CoursePostsComponent, canActivate: [Guard] },
            { path: 'see/:id', component: CoursePostViewComponent, canActivate: [Guard] },
            { path: 'add', component: CoursePostComponent, canActivate: [Guard] },
          ]
        },
        { path: '**', pathMatch:'full', redirectTo: 'courses'}
      ]
    },
    {
      path: 'centers',
      loadChildren: () => import('../../modules/centers/centers.module').then(m => m.CentersModule),
      children: [
        { path: '', component: CentersComponent, canActivate: [Guard] },
        { path: 'see/:id', component: CenterViewComponent, canActivate: [Guard] },
        { path: 'edit/:id', component: CenterComponent, canActivate: [Guard] },
        { path: 'add', component: CenterComponent, canActivate: [Guard] },
        { path: '**', pathMatch: 'full', redirectTo: 'centers' }
      ]
    },
    {
      path: 'degrees',
      loadChildren: () => import('../../modules/degrees/degrees.module').then(m => m.DegreesModule),
      children: [
        { path: '', component: DegreesComponent, canActivate: [Guard] },
        { path: 'see/:id', component: DegreeViewComponent, canActivate: [Guard] },
        { path: 'edit/:id', component: DegreeComponent, canActivate: [Guard] },
        { path: 'add', component: DegreeComponent, canActivate: [Guard] },
        { path: '**', pathMatch: 'full', redirectTo: 'centers' }
      ]
    },
    {
      path: 'subjects',
      loadChildren: () => import('../../modules/subject/subject.module').then(m => m.SubjectModule),
      children: [
        { path: '', component: SubjectsComponent, canActivate: [Guard] },
        { path: 'see/:id', component: SubjectViewComponent, canActivate: [Guard] },
        { path: 'edit/:id', component: SubjectComponent, canActivate: [Guard] },
        { path: 'add', component: SubjectComponent, canActivate: [Guard] },
        { path: '**', pathMatch: 'full', redirectTo: '' }
      ]
    },
    {
      path: 'home',
      loadChildren: () => import('../../modules/landing/landing.module').then(m => m.LandingModule),
      children: [
        { path: '', component: HomeComponent, canActivate: [Guard]
        }
      ]
    },
    { path: '**', pathMatch:'full', redirectTo: 'home'}
];

// {
//   path: '',
//   loadChildren: () => import('../../modules/').then(m => m),
//   children: [
//     { path: '', component: , canActivate: [Guard] },
//     { path: 'see/:id', component: , canActivate: [Guard] },
//     { path: 'edit/:id', component: , canActivate: [Guard] },
//     { path: 'add', component: , canActivate: [Guard] },
//     { path: '**', pathMatch: 'full', redirectTo: '' }
//   ]
// }
