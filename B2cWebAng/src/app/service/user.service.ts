import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ConfigService } from './config.service';

@Injectable()
export class UserService {

    constructor(
        public http: HttpClient,
        public config: ConfigService
    ) { }

     /* 注册模块
      * 检查邮箱是否重复
      */
     public isHaveThisEmail(email: string) {
        let url = this.config.apiUrl + 'user/register/isHaveThisEmail/';

        let data = {
            email: email,
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    /* 注册模块
     * 获取邮箱验证码
     */
     public getVerifyCodeOfEmail(email: string) {
        let url = this.config.apiUrl + 'user/register/sendVerifyCodeOfEmail/';

        let data = {
            email: email,
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    /* 注册模块
     * 注册
     */
    public register(email: string, password: string, verifyCode: string) {
        let url = this.config.apiUrl + 'user/register/';

        let data = {
            email: email,
            password: password,
            verifyCode: verifyCode
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    /*登录*/
    public login(email: string, password: string) {
        let url = this.config.apiUrl + 'user/login/';

        let data = {
            email: email,
            password: password
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }
    /*登出*/
    public logout() {
        let url = this.config.apiUrl + 'user/logout/';

        let data = {}
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 获取用户信息
    public getUserInfo() {
        let url = this.config.apiUrl + 'user/get/userInfo/';

        let data = {}
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }
    
    // 修改用户的默认地址
    public alterUserAddress(newAddress: string) {
        let url = this.config.apiUrl + 'user/alter/userAddress/';

        let data = {
            newAddress: newAddress
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }
    
    // 获取用户购物车
    public getUserCart() {
        let url = this.config.apiUrl + 'user/get/userCart/';

        let data = {}
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 购物车内增加数量
    public addQuantity(cartId: string) {
        let url = this.config.apiUrl + 'user/addQuantity/';

        let data = {
            cartId: cartId
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }
    // 购物车内减少数量
    public subQuantity(cartId: string) {
        let url = this.config.apiUrl + 'user/subQuantity/';

        let data = {
            cartId: cartId
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }
    //移除购物车的某件商品
    public removeCart(cartId: string) {
        let url = this.config.apiUrl + 'user/removeCart/';

        let data = {
            cartId: cartId
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }
    // 输入型改动购物车某个商品
    public inputAlterQuantity(cartId: string, quantity: string) {
        let url = this.config.apiUrl + 'user/inputAlterQuantity/';

        let data = {
            cartId: cartId,
            quantity: quantity
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

     // 取消或选择购物的所有商品
     public selectAllCart(checked: string) {
        let url = this.config.apiUrl + 'user/selectAllCart/';

        if(checked == "true"){
            checked = "1";
        }else if(checked == "false"){
            checked = "0";
        }
        let data = {
            checked: checked
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 购物车--选择或取消某个产品
    public selectOneCart(checked: string, cartId: string) {
        let url = this.config.apiUrl + 'user/selectOneCart/';

        if(checked == "true"){
            checked = "1";
        }else if(checked == "false"){
            checked = "0";
        }
        let data = {
            checked: checked,
            cartId: cartId
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 移除购物车所有商品
    public removeAllCart() {
        let url = this.config.apiUrl + 'user/removeAllCart/';
        let data = {}
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 用户创建订单
    public createOrder() {
        let url = this.config.apiUrl + 'order/createOrder/';
        let data = {}
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 获取用户订单
    public getUserOrder() {
        let url = this.config.apiUrl + 'order/getOrder/';
        let data = {}
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 用户确认收货
    public confirmReceipt(orderId: string) {
        let url = this.config.apiUrl + 'user/confirmReceipt/';
        let data = {
            orderId: orderId,
            status: '4'
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

}
