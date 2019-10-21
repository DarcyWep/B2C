import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistComponent } from './regist/regist.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
    {
        path: 'regist',
        component: RegistComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'order',
        component: OrderComponent
    },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class UserRoutingRoutes {}
