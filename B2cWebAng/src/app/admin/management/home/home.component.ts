import { record } from './../../adminModel';
import { AdminService } from './../../../service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../management.component.css', './home.component.css']
})
export class HomeComponent implements OnInit {

    currentPage: number = 1;
    totalPage: number;

    records: Array<record> = new Array<record>();

    constructor(
        private adminService:AdminService,
    ) { }

    ngOnInit() {
        this.getRecords(String(this.currentPage));
    }

    onPageChanged($event){
        this.getRecords(String($event.data.page));
    }

    private getRecords(page:string){
        let subObj = this.adminService.getAdminOperations(page).subscribe(
            res => {
                if(res['code'] == 1){ 
                  this.totalPage = res['allPages'];
                  this.records = res['operationInfos'];
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
