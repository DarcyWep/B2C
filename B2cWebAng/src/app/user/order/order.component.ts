import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { order } from 'src/app/model';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css', '../user.component.css']
})
export class OrderComponent implements OnInit {

    private isHaveFinishOrder: boolean = false;
    private isHaveNoFinishOrder: boolean = false;

    finishOrders: Array<order> = new Array<order>();
    notFinishOrders: Array<order> = new Array<order>();

    constructor(
        private userService: UserService,
        private router: Router,
        private cookieService: CookieService
    ) { }

    ngOnInit() {
        this.getUserOrder();
    }

    private getUserOrder(){
        let subObj = this.userService.getUserOrder().subscribe(
            res => {
                if(res['code'] == 1){
                    this.isHaveFinishOrder = res['isHaveFinishOrder'];
                    this.isHaveNoFinishOrder = res['isHaveNoFinishOrder'];
                    this.finishOrders = res['finishOrders'];
                    this.finishOrders.forEach(order => {
                        order.statusString = "已完成";
                    });
                    this.notFinishOrders = res['notFinishOrders'];
                    this.notFinishOrders.forEach(order => {
                        if(order.status == 2) order.statusString = "未发货";
                        else order.statusString = "已发货";
                    });
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

    // 确认收货
    private confirmReceipt(order: order){
        let subObj = this.userService.confirmReceipt(String(order.id)).subscribe(
            res => {
                if(res['code'] == 1){ 
                    this.getUserOrder();
                };
            },error => {
                alert("服务器出现错误，请稍后重试！");
            },() => {
                subObj.unsubscribe();
            }
        );
    }

}
