import { SpcCourseComponent } from './spc-course/spc-course.component';
import { PolityComponent } from './polity/polity.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { MathComponent } from './math/math.component';
import { EnglishComponent } from './english/english.component';

const routes: Routes = [
    {
        path: '',
        component: HomepageComponent,
    },
    {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
    },
    {
        path: 'math',
        component: MathComponent
    },
    {
        path: 'english',
        component: EnglishComponent,
    },
    {
        path: 'polity',
        component: PolityComponent,
    },
    {
        path: 'speCourse',
        component: SpcCourseComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
