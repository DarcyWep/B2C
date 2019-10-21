import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../../service/admin.service';
import { order } from '../../adminModel';

@Component({
    selector: 'app-orderlist',
    templateUrl: './orderlist.component.html',
    styleUrls: ['./orderlist.component.css', '../management.component.css']
})
export class OrderlistComponent implements OnInit {

    currentPage: number = 1;
    totalPage: number;

    orderList: Array<order> = new Array<order>();

    constructor(
        private adminService:AdminService,
    ) { }

    ngOnInit() {
        this.getOrderList(this.currentPage);
    }

    private onPageChanged($event){
        this.getOrderList($event.data.page);
    }

    // 获取用户列表
    private getOrderList(page: number){
        let subObj = this.adminService.getOrderList(String(page)).subscribe(
            res => {
                if(res['code'] == 1){ 
                    this.totalPage = res['allPages'];
                    this.orderList = res['orderInfos'];
                    this.orderList.forEach(order =>{
                        console.log(order.status);
                        if(order.status == 4) order.statusString = "已完成";
                        else if(order.status == 3) order.statusString = "待收货";
                    });
                }
            },error => {
                alert("服务器出现错误，请稍后重试！");
            },() => {
                subObj.unsubscribe();
            }
        );
    }

    // 发货按钮
    private deliverGoods(order: order){
        let subObj = this.adminService.deliverGoods(String(order.id)).subscribe(
            res => {
                if(res['code'] == 1){ 
                    order.status = 3;
                    order.statusString = "待收货";
                };
            },error => {
                alert("服务器出现错误，请稍后重试！");
            },() => {
                subObj.unsubscribe();
            }
        );
    }

}
