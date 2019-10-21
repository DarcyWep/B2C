import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ProductService } from './../service/product.service';
import { CookieService } from 'ngx-cookie-service';

import { product } from './../admin/adminModel';
@Component({
    selector: 'app-english',
    templateUrl: './english.component.html',
    styleUrls: ['./english.component.css', '../app.component.css']
})
export class EnglishComponent implements OnInit {

    products: Array<product> = new Array<product>();

    productDetail: product = new product;

    constructor(
        private productService: ProductService,
        private router: Router,
        private cookieService: CookieService
    ) { }

    ngOnInit() {
        this.getProductsToShow();
    }

    // 获取展示商品
    private getProductsToShow(){
        let subObj = this.productService.getProductsToShow('英语').subscribe(
            res => {
                if(res['code'] == 1){ 
                    this.products = res['productsInfo'] ;
                }
            },error => {
                alert("服务器出现错误，请稍后重试！");
            },() => {
                subObj.unsubscribe();
            }
        );
    }

    // 点击时的productDetail
    private getProductDetail(product: product){
        this.productDetail = product;
    }

    // 将商品加入购物车
    private addToCart(productId: number){
        document.getElementById("productDetailModal").click();
        if(this.cookieService.get('userId')==''){
            alert("账号未登录！请先登录后将商品加至购物车！");
            this.router.navigateByUrl('user/login');
        }else{
            let subObj = this.productService.addProductToCart(String(productId)).subscribe(
                res => {
                    if(res['code'] == 1){ 
                        alert('商品已加入购物车！');
                    }else if(res['code'] == 0){
                        alert("账号未登录！请先登录后将商品加至购物车！");
                        this.cookieService.set('userId', '');
                        this.cookieService.set('userEmail', '');
                        this.router.navigateByUrl('user/login');
                    }else if(res['code'] == -1){  
                        alert("参数错误！添加失败！");
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
