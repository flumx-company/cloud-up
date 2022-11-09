import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CurrencyService {

  constructor(protected httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get<any>(`api/master-data/currency`).toPromise();
  }

  getDataIsocd(iscdo: any) {
    return this.httpClient.get<any>(`api/master-data/currency/${iscdo}`).toPromise();
  }

  saveData(data: any) {
    return this.httpClient.post<any>(`api/master-data/currency`, data).toPromise();
  }

  putDataKey(data: any, Id: any) {
    return this.httpClient.put<any>(`/api/master-data/currency/${Id}`, data).toPromise();
  }

  deleteData(Id: any) {
    return this.httpClient.delete<any>(`api/master-data/currency/${Id}`).toPromise();
  }

}
