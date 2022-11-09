import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class VendorsService {

  constructor(protected httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get<any>(`api/master-data/vendor`).toPromise();
  }

  getDataLifnr(lif: any) {
    return this.httpClient.get<any>(`api/master-data/vendor/${lif}`).toPromise();
  }

  saveData(data: any) {
    return this.httpClient.post<any>(`api/master-data/vendor`, data).toPromise();
  }

  putDataKey(data: any, Id: any) {
    return this.httpClient.put<any>(`api/master-data/vendor/${Id}`, data).toPromise();
  }

  deleteData(Id: any) {
    return this.httpClient.delete<any>(`api/master-data/vendor/${Id}`).toPromise();
  }

}
