import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';

import { SharkModule } from '@ntesmail/shark-angular2'; // 需导入，angular2的分页
import { ReactiveFormsModule } from '@angular/forms';   // angular 表单
import { FormsModule } from '@angular/forms';   //html页面使用ngModule时需引入

import { ManagementRoutes } from './management.routing';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { OrderlistComponent } from './orderlist/orderlist.component';

@NgModule({
    imports: [
        CommonModule,
        ManagementRoutes,
        SharkModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        ManagementComponent,
        HomeComponent,
        NavComponent,
        ProfileComponent,
        UserlistComponent,
        ProductlistComponent,
        OrderlistComponent
    ],
    bootstrap: [ManagementComponent] /*必须有，否则路由无法跳转*/
})
export class ManagementModule { }
