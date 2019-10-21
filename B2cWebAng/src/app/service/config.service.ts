import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigService {

    public apiUrl: string = environment.apiUrl;
    public headers ={
        headers: new HttpHeaders({
            'credentials': 'true',
        })
    };

    constructor() { }

}
