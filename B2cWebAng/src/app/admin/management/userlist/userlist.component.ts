import { Component, OnInit } from '@angular/core';

import { AdminService } from './../../../service/admin.service';

import { user } from './../../adminModel';

@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.css', '../management.component.css']
})
export class UserlistComponent implements OnInit {

    currentPage: number = 1;
    totalPage: number;

    userList: Array<user> = new Array<user>();
    
    currentId: number;   //当前选择用户的id
    currentUserEmail: string;
    newPassword: string = '';
    passwordResult: boolean = false;

    constructor(
        private adminService:AdminService,
    ) { }

    ngOnInit() {
        this.getUserList(this.currentPage);
    }

    private onPageChanged($event){
        this.getUserList($event.data.page);
    }

    // 获取用户列表
    private getUserList(page: number){
        let subObj = this.adminService.getUserList(String(page)).subscribe(
        res => {
            if(res['code'] == 1){ 
                this.totalPage = res['allPages'];
                this.userList = res['userInfos'] ;
                if(this.userList){
                    this.userList.forEach(user => {
                        if(user.status == -1){
                            user.statusString = '冻结';
                        }else if(user.status == 1){
                            user.statusString = '正常';
                        }
                    });
                }
                
            }
        },error => {
            alert("服务器出现错误，请稍后重试！");
        },() => {
            subObj.unsubscribe();
        }
        );
    }

    // 修改用户密码
    private selectId(id:number, email:string){
        this.currentId = id;
        this.currentUserEmail = email;
    }

    private alterUserPassword(){
        if(this.newPassword.length >= 6){
            let subObj = this.adminService.alterUserPassword(String(this.currentId), this.newPassword).subscribe(
                res => {
                    if(res['code'] == 1){ 
                        this.passwordResult = false;
                        document.getElementById("closeModal").click();
                        alert("修改成功!");
                    }else{  
                        alert("修改失败!");
                    }
                },error => {
                    alert("服务器出现错误，请稍后重试！");
                },() => {
                    subObj.unsubscribe();
                }
            );
        }else{
            this.passwordResult = true;
        }
    }

    // 修改用户状态
    private alterUserStatus(userId:number,newStatus:number){
        let subObj = this.adminService.alterUserStatus(String(userId), String(newStatus)).subscribe(
        res => {
            if(res['code'] == 1){ 
                this.userList.forEach(user => {
                    if(user.id == userId){
                        user.status = newStatus;
                        if(user.status == -1){
                            user.statusString = '冻结';
                        }else if(user.status == 1){
                            user.statusString = '正常';
                        }
                    }
                });
            }else{  
                alert('操作失败!');
            }
        },error => {
            alert("服务器出现错误，请稍后重试！");
        },() => {
            subObj.unsubscribe();
        }
        );
    }

}
