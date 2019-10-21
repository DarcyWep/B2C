import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';

import { UserRoutingRoutes } from './user-routing.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //表单，两个都要导入

import { RegistComponent } from './regist/regist.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ShareHeaderModule } from './../share-header/share-header.module';
import { ShareFooterModule } from './../share-footer/share-footer.module';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingRoutes,
        ShareHeaderModule,
        ShareFooterModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        UserComponent,
        RegistComponent,
        LoginComponent,
        ProfileComponent,
        CartComponent,
        OrderComponent
    ],
    bootstrap: [UserComponent]
})
export class UserModule { }
