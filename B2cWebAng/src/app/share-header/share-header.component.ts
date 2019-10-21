import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-share-header',
    templateUrl: './share-header.component.html',
    styleUrls: ['./share-header.component.css']
})
export class ShareHeaderComponent implements OnInit {

    helloString: string = "请登录";

    constructor(
        private router: Router,
        private cookieService: CookieService,
        private userService: UserService
    ) { }

    ngOnInit() {
        if(this.cookieService.get('userEmail')){
            this.helloString = this.cookieService.get('userEmail');
        }
    }
    private goRegist() {
        this.router.navigateByUrl('/user/regist');
    }
    private goLogin() {
        if( this.helloString == "请登录"){
           this.router.navigateByUrl('/user/login'); 
        }else{
        }
    }
    private goProfile(){
        this.router.navigateByUrl('/user/profile');
    }
    private goCart(){
        this.router.navigateByUrl('/user/cart');
    }
    private goOrder(){
        this.router.navigateByUrl('/user/order');
    }
    private logout(){
        let subObj = this.userService.logout().subscribe(
            res => {
                if(res['code'] == 1){
                    this.cookieService.deleteAll();
                    location.reload()
                }
            },error => {
                alert("服务器出现错误，请稍后重试！");
            },() => {
                subObj.unsubscribe();
            }
        );
    }
}
