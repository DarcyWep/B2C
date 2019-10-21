import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { cart } from './../../model';


@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css', '../user.component.css']
})
export class CartComponent implements OnInit {

    private carts: Array<cart> = new Array<cart>();
    private isSelectAll: boolean = true;
    private isSelectCart: boolean = false;
    private isHaveCart: boolean = false;
    private userAddress: string;
    private newAddress: string;
    private orderTotalMoney: number = 0;
    private orderTotalQuantity: number = 0;

    constructor(
        private userService: UserService,
        private router: Router,
        private cookieService: CookieService
    ) { }

    ngOnInit() {
        this.getUserCart();
    }

    private getUserCart() {
        let subObj = this.userService.getUserCart().subscribe(
            res => {
                if(res['code'] == 1){
                    this.userAddress = res['userAddress'];
                    this.newAddress = res['userAddress'];
                    this.orderTotalMoney = res['orderTotalMoney'];
                    this.orderTotalQuantity = res['orderTotalQuantity'];
                    this.isSelectCart = res['isSelectCart'];
                    this.carts = res['cartsInfo'];
                    if(this.carts.length) this.isHaveCart = true;
                    this.carts.forEach(cart =>{
                        cart.productImg = "../" + cart.productImg;
                        if(cart.cartChecked == false){
                            this.isSelectAll = false;
                        }
                    })
                }else{  
                    alert("账号未登录！请先登录！");
                    this.cookieService.set('userId', '');
                    this.cookieService.set('userEmail', '');
                    this.cookieService.set('userAddress', '');
                    this.router.navigateByUrl('user/login');
                }
            },error => {
                alert("服务器出现错误，请稍后重试！");
            },() => {
                subObj.unsubscribe();
            }
        );
    }

    //增加购物车商品数量
    private addQuantity(cart: cart){
        let subObj = this.userService.addQuantity(String(cart.cartId)).subscribe(
            res => {
                if(res['code'] == 1){
                    this.orderTotalMoney = res['orderTotalMoney'];
                    this.orderTotalQuantity = res['orderTotalQuantity'];
                    this.isSelectCart = res['isSelectCart'];
                    cart.cartQuantity = cart.cartQuantity + 1;
                    cart.cartTotalPrice = (cart.cartQuantity * cart.productPrice).toFixed(2);
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

    //减少购物车商品数量
    private subQuantity(cart: cart){
        if(cart.cartQuantity > 1){
            let subObj = this.userService.subQuantity(String(cart.cartId)).subscribe(
                res => {
                    if(res['code'] == 1){
                        this.orderTotalMoney = res['orderTotalMoney'];
                        this.orderTotalQuantity = res['orderTotalQuantity'];
                        this.isSelectCart = res['isSelectCart'];
                        cart.cartQuantity = cart.cartQuantity - 1;
                        cart.cartTotalPrice = (cart.cartQuantity * cart.productPrice).toFixed(2);
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
        }else{
            alert("数据错误！");
        }
    }
    // 输入修改购物车某个商品的数量
    private inputAlterQuantity(cart: cart){
        if(cart.cartQuantity >= 1){
            let subObj = this.userService.inputAlterQuantity(String(cart.cartId), String(cart.cartQuantity)).subscribe(
                res => {
                    if(res['code'] == 1){
                        this.orderTotalMoney = res['orderTotalMoney'];
                        this.orderTotalQuantity = res['orderTotalQuantity'];
                        this.isSelectCart = res['isSelectCart'];
                        cart.cartTotalPrice = (cart.cartQuantity * cart.productPrice).toFixed(2);
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
        }else{
            alert("数据错误！");
            this.getUserCart();
        }
    }
    // 输入事件
    private keyUpQuantity(cart: cart){
        if(cart.cartQuantity >= 1){
            cart.cartTotalPrice = (cart.cartQuantity * cart.productPrice).toFixed(2);
        }else{
            cart.cartTotalPrice = "0.00";
        }
    }


    // 从购物车移除商品
    private removeCart(cart: cart){
        let subObj = this.userService.removeCart(String(cart.cartId)).subscribe(
            res => {
                if(res['code'] == 1){
                    this.orderTotalMoney = res['orderTotalMoney'];
                    this.orderTotalQuantity = res['orderTotalQuantity'];
                    this.isSelectCart = res['isSelectCart'];
                    this.carts = res['cartsInfo'];
                    if(this.carts.length) this.isHaveCart = true;
                    else this.isHaveCart = false;
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

    // 复选框之全选
    private selectAllCart(checked: boolean){    
        this.isSelectAll = checked;
        this.carts.forEach(cart =>{
            cart.cartChecked = checked;
        });
        // 更新数据库
        let subObj = this.userService.selectAllCart(String(checked)).subscribe(
            res => {
                if(res['code'] == 1){
                    this.orderTotalMoney = res['orderTotalMoney'];
                    this.orderTotalQuantity = res['orderTotalQuantity'];
                    this.isSelectCart = res['isSelectCart'];
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
    // 选中某个商品
    private selectOneCart(checked: boolean, cart: cart){
        cart.cartChecked = checked;
        // 更新数据库
        let subObj = this.userService.selectOneCart(String(checked), String(cart.cartId)).subscribe(
            res => {
                if(res['code'] == 1){
                    this.orderTotalMoney = res['orderTotalMoney'];
                    this.orderTotalQuantity = res['orderTotalQuantity'];
                    this.isSelectCart = res['isSelectCart'];
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

    // 修改用户默认地址
    private alterUserAddress(){
        document.getElementById("myLargeModalLabel").click();
        if(this.userAddress != this.newAddress){
            let subObj = this.userService.alterUserAddress(this.newAddress).subscribe(
                res => {
                    if(res['code'] == 1){
                    this.userAddress = this.newAddress;
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

    // 移除所有商品
    private removeAllCart(){
        let subObj = this.userService.removeAllCart().subscribe(
            res => {
                if(res['code'] == 1){
                    this.orderTotalMoney = 0;
                    this.orderTotalQuantity = 0;
                    this.isHaveCart = false;
                    this.carts = [];
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

    private createOrder(){
        document.getElementById('payModal').click();
        let subObj = this.userService.createOrder().subscribe(
            res => {
                if(res['code'] == 1){
                    this.getUserCart();
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


    private cancelOrder(){
        alert('订单已取消！');
        document.getElementById('payModal').click();
    }

}
