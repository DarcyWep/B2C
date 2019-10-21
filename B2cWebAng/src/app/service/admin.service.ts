import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ConfigService } from './config.service';


@Injectable()
export class AdminService {


    productMainImg: any;

    constructor(
        public http: HttpClient,
        public config: ConfigService
    ) { }

    /*登录*/
    public login(email: string, password: string) {
        let url = this.config.apiUrl + 'admin/login/';

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

    /*获取用户信息*/
    public getAdminInfo() {
        let url = this.config.apiUrl + 'admin/get/adminInfo/';

        let data = { }
        let params = new HttpParams({
            fromObject: data
        });
        // 少了params无法传递session？？？
        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    /*获取操作记录*/
    public getAdminOperations(page: string){ 
        let url = this.config.apiUrl + 'admin/get/adminOperations/';
    
        let data = {
            page: page,
        }
        let params = new HttpParams({
            fromObject: data
        });
    
        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 管理员使用旧密码修改密码
    public alterAdminPassword(oldPassword:string, newPassword:string){
        let url = this.config.apiUrl + 'admin/alter/adminPassword/';
    
        let data = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        let params = new HttpParams({
            fromObject: data
        });
    
        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 获取用户列表
    public getUserList(page: string){ 
        let url = this.config.apiUrl + 'admin/get/usersInfo/';
    
        let data = {
            page: page,
        }
        let params = new HttpParams({
            fromObject: data
        });
    
        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 管理员修改用户密码
    public alterUserPassword(userId: string, newPassword: string){
        let url = this.config.apiUrl + 'admin/alter/userPassword/';
    
        let data = {
            userId: userId,
            newPassword: newPassword
        }
        let params = new HttpParams({
            fromObject: data
        });
    
        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 管理员修改用户状态
    public alterUserStatus(userId: string, newStatus: string){
        let url = this.config.apiUrl + 'admin/alter/userStatus/';
    
        let data = {
            userId: userId,
            newStatus: newStatus
        }
        let params = new HttpParams({
            fromObject: data
        });
    
        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 获取商品主图
    public getProductMainImg(productMainImg: any){
        this.productMainImg = productMainImg;
    }

    // 管理员修改用户状态
    public uploadProduct(productName: string, productPrice: string, productStock: string, productCategory: string){
        let url = this.config.apiUrl + 'admin/product/add/';
    
        let params = new FormData();
    
        params.append("productName", productName);
        params.append("productPrice", productPrice);
        params.append("productStock", productStock);
        params.append("productCategory", productCategory);
        params.append("productMainImg", this.productMainImg);
        
        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 获取上架商品记录
    public getProducts(page: string){ 
        let url = this.config.apiUrl + 'admin/get/productsInfo/';
    
        let data = {
            page: page,
        }
        let params = new HttpParams({
            fromObject: data
        });
    
        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 获取订单列表
    public getOrderList(page: string){ 
        let url = this.config.apiUrl + 'admin/get/ordersInfo/';
    
        let data = {
            page: page,
        }
        let params = new HttpParams({
            fromObject: data
        });
    
        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    // 发货
    public deliverGoods(orderId: string){ 
        let url = this.config.apiUrl + 'admin/alter/deliverGoods/';
    
        let data = {
            status: '3',
            orderId: orderId
        }
        let params = new HttpParams({
            fromObject: data
        });
    
        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }
    
}
