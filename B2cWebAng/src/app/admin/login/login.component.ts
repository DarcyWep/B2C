import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AdminService } from './../../service/admin.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    adminForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private adminservice: AdminService
    ) {
        this.adminForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
     }

    ngOnInit() {
        this.setHeight();
    }

    private setHeight(){
        let htmlHeight = document.getElementById("html").offsetHeight;
        document.getElementById("login").style.height = String(htmlHeight-140) + "px";
    }

    private login() {
        let subObj = this.adminservice.login(
            this.adminForm.get('email').value, this.adminForm.get('password').value).subscribe(
                res => {
                    if(res['code'] == 1){ 
                        this.router.navigateByUrl('admin/management/home');
                    }else{  
                        alert("登录失败！请检查账户或者密码");
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
