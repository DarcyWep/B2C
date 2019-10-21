import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    private user = new class{
        id: number;
        email: string;
        createTime: string;
        address: string;
    }
    private newAdress: string;

    constructor(
        private userService: UserService,
        private router: Router,
        private cookieService: CookieService
    ) { }

    ngOnInit() {
      this.setHeight();
      this.getUserInfo();
    }
    
    private setHeight(){
        let htmlHeight = document.getElementById("html").offsetHeight;
        document.getElementById("body").style.height = String(htmlHeight-155) + "px";
    }

    private getUserInfo() {
        let subObj = this.userService.getUserInfo().subscribe(
            res => {
                if(res['code'] == 1){
                    this.user = res['userInfo'];
                    if(res['userInfo']['address']){
                        this.newAdress = res['userInfo']['address'];
                    }
                }else{  
                    alert("账号未登录！请先登录！");
                    this.cookieService.set('userId', '');
                    this.cookieService.set('userEmail', '');
                    this.router.navigateByUrl('user/login');
                }
            },error => {
                alert("服务器出现错误，请稍后重试！");
            },() => {
                subObj.unsubscribe();
            }
        );
    }

    private alterUserAddress(){
        let subObj = this.userService.alterUserAddress(this.newAdress).subscribe(
            res => {
                if(res['code'] == 1){
                  this.user.address = this.newAdress;
                    alert("修改成功！欢迎继续购物！");
                    document.getElementById("myLargeModalLabel").click();
                }else if(res['code'] == 0){  
                    alert("账号未登录！请先登录！");
                    this.cookieService.set('userId', '');
                    this.cookieService.set('userEmail', '');
                    this.router.navigateByUrl('user/login');
                }
            },error => {
                alert("服务器出现错误，请稍后重试！");
            },() => {
                subObj.unsubscribe();
            }
        );
    }

}
