import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ConfigService } from './config.service';

@Injectable()
export class ProductService {

    constructor(
        public http: HttpClient,
        public config: ConfigService
    ) { }

    // 获取商品
    public getProductsToShow(category: string) {
        let url = this.config.apiUrl + 'get/products/';

        let data = {
          category: category
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }

    //将商品加入购物车
    public addProductToCart(productId: string) {
        let url = this.config.apiUrl + 'user/addProductToCart/';

        let data = {
            productId: productId,
            quantity: '1',
            checked: '0'
        }
        let params = new HttpParams({
            fromObject: data
        });

        return this.http.post(url, params, {withCredentials : true}).pipe(
            map((res:any) => { return res; })
        );
    }
}
