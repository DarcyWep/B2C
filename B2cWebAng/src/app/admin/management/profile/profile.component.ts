import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminService } from './../../../service/admin.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css', '../management.component.css']
})
export class ProfileComponent implements OnInit {

    // 管理员信息
    id: number;
    email: string;    
    createTime: string;

    checkOldPasswd: boolean = true;   //旧密码检查结果
    checkRepeatPasswd: boolean;     //重复密码检查结果
    passwordStatus: string = '点击修改密码'; 
    alterPasswordResult: boolean = false;

    profileForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private adminService: AdminService,
    ) {
        this.profileForm = this.formBuilder.group({
            oldPassword: ['', Validators.required ],
            password:    ['', Validators.required ],
            repeatPassword:  ['', Validators.required ],
        });
    }

    ngOnInit() {
        this.getAdminInfo();
    }

    private getAdminInfo(){
        let subObj = this.adminService.getAdminInfo().subscribe(
            res => {
                if(res['code'] == 1){ 
                    this.id = res['id'];
                    this.email = res['email'];
                    this.createTime = res['createTime'];
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

    private checkPassword(){
        if(this.profileForm.get('password').value == this.profileForm.get('repeatPassword').value){
          this.checkRepeatPasswd = true;
        }else{
          this.checkRepeatPasswd = false;
        }
    }

    private alterPassword(){
        if(this.checkRepeatPasswd == true && this.profileForm.get('oldPassword').value!=''
            && this.profileForm.get('password').value!=''){

            let subObj = this.adminService.alterAdminPassword(
                this.profileForm.get('oldPassword').value,this.profileForm.get('password').value).subscribe(
                res => {
                    if(res['code'] == 1){    
                        this.passwordStatus = '修改成功';
                        this.router.navigateByUrl('admin/management/profile');
                        this.alterPasswordResult = true;
                        document.getElementById("closeModal").click();
                    }else if(res['code'] == 2){   //原密码错误
                        this.checkOldPasswd = false;
                    }else{
          
                    }
                },error => {
                    alert("服务器出现错误，请稍后重试！");
                },() => {
                    subObj.unsubscribe();
                }
            );
        }
    }
}
