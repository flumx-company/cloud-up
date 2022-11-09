import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class PaymentTermsService {

  constructor(protected httpClient: HttpClient) {
  }

  getData() {
    return this.httpClient.get<any>(`api/master-data/payment-term`).toPromise();
  }

  saveData(awsys: any, data: any) {
    return this.httpClient.post<any>(`api/master-data/payment-term/${awsys}`, data).toPromise();
  }

  putDataKey(awsys: any, zterm: any, data: any) {
    return this.httpClient.put<any>(`api/master-data/payment-term/${awsys}/${zterm}`, data).toPromise();
  }

  deleteData(awsys: any, zterm: any) {
    return this.httpClient.delete<any>(`api/master-data/payment-term/${awsys}/${zterm}`).toPromise();
  }

}
