import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'management',
      loadChildren: './management/management.module#ManagementModule'
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class AdminRoutes {}
