import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CompanyCodeService {

  constructor(protected httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get<any>(`api/master-data/company-code`).toPromise();
  }

  getDataBukrs(buk: any) {
    return this.httpClient.get<any>(`api/master-data/company-code/${buk}`).toPromise();
  }

  saveData(data: any) {
    return this.httpClient.post<any>(`api/master-data/company-code`, data).toPromise();
  }

  putDataKey(data: any, Id: any) {
    return this.httpClient.put<any>(`api/master-data/company-code/${Id}`, data).toPromise();
  }

  deleteData(Id: any) {
    return this.httpClient.delete<any>(`api/master-data/company-code/${Id}`).toPromise();
  }

}
