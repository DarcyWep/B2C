import { Component, OnInit } from '@angular/core';

import { AdminService } from './../../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { product } from './../../adminModel';


@Component({
    selector: 'app-productlist',
    templateUrl: './productlist.component.html',
    styleUrls: ['./productlist.component.css', '../management.component.css']
})
export class ProductlistComponent implements OnInit {

    currentPage: number = 1;
    totalPage: number;

    products: Array<product> = new Array<product>();

    productDetail: product = new product();

    isProductHaveEmpty: boolean = true;
    isHaveProductMainImg: boolean = false;

    productForm: FormGroup;

    constructor(
        private adminService: AdminService,
        private formBuilder: FormBuilder,
    ) {
        this.productForm = this.formBuilder.group({
            productName: ['', Validators.required ],
            productPrice:    ['', Validators.required ],
            productStock:  ['', Validators.required ],
            productCategory:  ['', Validators.required ],
        });
    }

    ngOnInit() {
        this.getProducts(this.currentPage);
    }

    private addProductMainImg(productMainImg: any){
        this.isHaveProductMainImg = true;
        this.adminService.getProductMainImg(productMainImg.files[0]);
    }

    private uploadProduct(){
        if(this.productForm.get('productName').value == "" || this.productForm.get('productPrice').value == "" 
            || this.productForm.get('productStock').value == "" || this.productForm.get('productCategory').value == ""
            || this.isHaveProductMainImg == false ){
            this.isProductHaveEmpty = false;
        }else{
            this.isProductHaveEmpty = true;
            let subObj = this.adminService.uploadProduct(
                this.productForm.get('productName').value, this.productForm.get('productPrice').value, 
                this.productForm.get('productStock').value, this.productForm.get('productCategory').value)
                .subscribe(res => 
                    {
                        if(res['code'] == 1){
                            document.getElementById("addProductModal").click();
                            alert("添加成功！");
                            this.getProducts(this.currentPage);
                        }else{  
                            alert("文件类型不符合！");
                        }
                    },error => {
                        alert("服务器出现错误，请稍后重试！");
                    },() => {
                        subObj.unsubscribe();
                    }
            );
        }
    }
    // 还原输入提醒
    private inputEmpty(){
        this.isProductHaveEmpty = true;
    }


    //  获取所有商品信息 
    private  onPageChanged($event){
        this.currentPage = $event.data.page;
        this.getProducts($event.data.page);
    }

    private  getProducts(page:number){
        let subObj = this.adminService.getProducts(String(page)).subscribe(
            res => {
                if(res['code'] == 1){ 
                    this.totalPage = res['allPages'];
                    this.products = res['productsInfo'];
                }else{  
                    alert("目前还没有上架的商品！");
                }
            },error => {
                alert("服务器出现错误，请稍后重试！");
            },() => {
                subObj.unsubscribe();
            }
        );
    }
}
