import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementComponent } from './management.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { OrderlistComponent } from './orderlist/orderlist.component';

const routes: Routes = [
    {
        path: '',
        component: ManagementComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
    ,
    {
        path: 'user',
        component: UserlistComponent
    },
    {
        path: 'product',
        component: ProductlistComponent
    },
    {
      path: 'order',
      component: OrderlistComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class ManagementRoutes {}
