import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PaymentMethodsService {

  constructor(protected httpClient: HttpClient) {}

  getData() {
    return this.httpClient.get<any>(`api/master-data/payment-method`).toPromise();
  }

  saveData(data: any, logi: any) {
    return this.httpClient.post<any>(`api/master-data/payment-method/${logi}`, data).toPromise();
  }

  putDataKey(data: any, awsys:any, payMethod:any) {
    return this.httpClient.put<any>(`api/master-data/payment-method/${awsys}/${payMethod}`, data).toPromise();
  }

  deleteData(awsys: any,payMethod: any ) {
    return this.httpClient.delete<any>(`api/master-data/payment-method/${awsys}/${payMethod}`).toPromise();
  }

}
