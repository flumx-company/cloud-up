import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {map} from "rxjs/operators";
import {CURRENCY} from "../interface/currency.interface";

@Injectable()
export class CurrencyService {
    protected base : String = 'https://alevate-cap-api.azurewebsites.net';
    constructor(
        protected httpClient: HttpClient,
    ) {  }

    getCurrency() {
        return this.httpClient.get<CURRENCY>(`api/master-data/currency`)
            .pipe(
                map((data: any) => {
                    return data.map((item: any) => {
                        item.DESCRIPTION = Array.isArray(item.CURRENCY.DESC_TRANSLATE) ? item.CURRENCY.DESC_TRANSLATE : [{...item.CURRENCY.DESC_TRANSLATE}];
                        item.CURRENCY = item.CURRENCY.ISOCD;
                        return item;
                    })
                })
            );

    }
    getOneCurrency(data:any) {
        return this.httpClient.get<CURRENCY>(`api/master-data/currency/${data}`)
    }
    setCurrency(data:any) : any{
        return this.httpClient.post<CURRENCY>(`api/master-data/currency`, data)
    }
    putCurrency(id:any, data:any) : any{
        return this.httpClient.put<CURRENCY>(`api/master-data/currency/${id}`, data)
    }
    deleteCurrency(id:any){
        return this.httpClient.delete<CURRENCY>(`api/master-data/currency/${id}`)
    }
    test(currencyStatic:any){
        return new Promise((resolve, reject):any => {
                // setTimeout(function(){
                    resolve({data: currencyStatic.DESC_TRANSLATE, totalCount: currencyStatic.DESC_TRANSLATE.length})
                // },300)
            })
    }
}
