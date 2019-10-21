import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './../../service/user.service';

@Component({
    selector: 'app-regist',
    templateUrl: './regist.component.html',
    styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {

    //邮箱
    checkEmailStatus: boolean = false ; //测试初值 默认为false
    checkEmailString: string = '正在检查邮箱';  //邮箱检查结果

    //密码
    checkePassword: boolean;  //密码检查结果

    //验证码
    verifyCode: string; //验证码
    verifyCodeBtnStatus: boolean = true;  //验证码按钮的状态
    verifyCodeBtnText: string;  //验证码按钮的文本
    timer: any;  //计时器
    timing: number;  //计时

    //注册
    submitResult: boolean = false;  //提交返回的状态
    submitted: boolean = false;

    userForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,
    ) {
        this.userForm = this.formBuilder.group({
            email: ['', Validators.required ],
            password: ['', Validators.required ],
            repeatPassword: ['', Validators.required ],
            verifyCode: ['', Validators.required ],
            agreement: ['', Validators.required ],
        });
    }

    ngOnInit() {
      this.verifyCodeBtnText = '获取验证码';
      this.timing = 60;
    }

    /**
    * 路由功能
    */
    private goHome(){
      this.router.navigateByUrl('/');
    }

    //检查邮箱
    private isHaveThisEmail(){      //检查邮箱是否重复
      if(!this.userForm.get('email').value){       //邮箱未填写

      }else{
          let subObj = this.userService.isHaveThisEmail(this.userForm.get('email').value).subscribe(
              res => {
                  if(res['code'] == 1){    //邮箱可以使用
                      this.checkEmailString = '邮箱可以使用';
                      this.checkEmailStatus = true;
                      this.verifyCodeBtnStatus = false;  //验证码按钮的状态
                  }else if(res['code'] == 2){   //邮箱已经存在
                      this.checkEmailString = '邮箱已经被注册';
                      this.checkEmailStatus = false;
                  }
              },error => {
                  alert("服务器出现错误，请稍后重试！");
              },() => {
                  subObj.unsubscribe();
              }
          );
      }

    }

    //计时
    private countTime(){
        if(this.timing > 0){
            this.timing--;
            this.verifyCodeBtnText = '重新发送(' + this.timing + 's)';
        }
        else{
            clearInterval(this.timer);
            this.timing = 60;
            this.verifyCodeBtnStatus = false;
            this.verifyCodeBtnText = '重新发送';
        }
    }

    //发送验证码
    private getVerifyCodeOfEmail(){          
      if(!this.userForm.get('email').value){   //如果邮箱没有输入

      }
      else{
          let subObj = this.userService.getVerifyCodeOfEmail(this.userForm.get('email').value).subscribe(
              res => {
                  if(res['code']==1){
                      alert('验证码发送成功，请注意查收！');
                  }else{
                      alert('验证码发送失败，请稍后重试！');
                  }
              },error => {
                  alert("服务器出现错误，请稍后重试！");
              },() => {
                  subObj.unsubscribe();
              }
          );
          this.verifyCodeBtnStatus = true;
          clearInterval(this.timer);
          this.timer = setInterval(() =>{this.countTime()}, 1000);
      }

    }

    private checkPassword(){
        if(this.userForm.get('password').value == this.userForm.get('repeatPassword').value){
            this.checkePassword = true;
        }else{
            this.checkePassword = false;
        }
    }

    private register(){    //发送所提交的全部表单
        this.submitted = true;
        let subObj = this.userService.register(this.userForm.get('email').value,
          this.userForm.get('password').value, this.userForm.get('verifyCode').value).subscribe(
            res => {
                this.submitted = true;
                if(res['code'] == 1){
                    this.submitResult = true;
                    this.router.navigateByUrl('user/login');
                }else if(res['code'] == 2 || res['code'] == 3){
                    this.submitResult = false;
                    alert('验证码错误！');
                }else{
                    this.submitResult = false;
                    alert('注册失败，请稍后重试或联系客服！');
                }
            },error => {
                this.submitResult = false;
                alert("服务器出现错误，请稍后重试！");
            },() => {
                subObj.unsubscribe();
            }
        );
    }

}
