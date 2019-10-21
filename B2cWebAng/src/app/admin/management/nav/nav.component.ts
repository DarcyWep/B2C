import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AdminService } from './../../../service/admin.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    routerStatue: number = 1;  //路由状态

    // messageNumber:number;
    email:string = '';

    constructor(
        private router:Router,
        private location: Location,
        private adminService:AdminService,
    ) { 
        this.location = location;
    }

    ngOnInit() {
        this.judgeRouter();
        this.isLogin();
    }

    /**
     * 判断当前路由
     */
    private judgeRouter() {
        if(this.location.path() == '/admin/management/home' ){
            this.routerStatue = 1;
        }else if(this.location.path() == '/admin/management/profile'){
            this.routerStatue = 2;
        }else if(this.location.path() == '/admin/management/user'){
            this.routerStatue = 3;
        }else if(this.location.path() == '/admin/management/order'){
            this.routerStatue = 4;
        }else if(this.location.path() == '/admin/management/product'){
            this.routerStatue = 5;
        }
    }

    /**
     * 切换路由
     */
    private goHome(){
        this.router.navigateByUrl('/admin/management/home');
    }
    private goProfile(){
        this.router.navigateByUrl('/admin/management/profile');
    }
    private goUser(){
        this.router.navigateByUrl('/admin/management/user');
    }
    private goOrder(){
        this.router.navigateByUrl('/admin/management/order');
    }
    private goProduct(){
        this.router.navigateByUrl('/admin/management/product');
    }

    /**
     * 是否登录
     */
    private isLogin(){
        let subObj = this.adminService.getAdminInfo().subscribe(
            res => {
                if(res['code'] == 1){ 
                    this.email = res['email'];
                    // this.router.navigateByUrl('admin/management/home'); //加上这一句无论如何都跳到首页
                }else{  
                    alert("未登录");
                    this.router.navigateByUrl('admin/login'); 
                }
            },error => {
                alert("服务器出现错误，请稍后重试！");
            },() => {
                subObj.unsubscribe();
            }
        );
    }

}
