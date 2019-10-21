import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../service/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userForm: FormGroup;

    constructor(
        private router: Router,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private cookieService: CookieService,
    ) {
        this.userForm = this.formBuilder.group({
            email: ['', Validators.required ],
            password: ['', Validators.required ],
        });
    }

    ngOnInit() {
    }

    private login() {
        let subObj = this.userService.login(
            this.userForm.get('email').value, this.userForm.get('password').value).subscribe(
                res => {
                    if(res['code'] == 1){
                        this.cookieService.set('userEmail', res['userEmail']);
                        this.cookieService.set('userId', res['userId']);
                        this.cookieService.set('userAddress', res['userAddress']);
                        this.router.navigateByUrl('');
                    }else{  
                        alert("登录失败！请检查账户或者密码");
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
