import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutes } from './admin.routing';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutes,
        ReactiveFormsModule,
    ],
    declarations: [
        AdminComponent,
        LoginComponent
    ],
    bootstrap: [AdminComponent] /*必须有，否则路由无法跳转*/
})
export class AdminModule { }
