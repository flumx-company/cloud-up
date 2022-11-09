import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PtsApiService {

  constructor(protected httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get<any>(`api/pts`).toPromise();
  }

  getDataCon(con: any) {
    return this.httpClient.get<any>(`api/pts/${con}`).toPromise();
  }

  getDataHis(con: any) {
    return this.httpClient.get<any>(`api/pts/${con}/history`).toPromise();
  }

  getDataAppro(con: any) {
    return this.httpClient.get<any>(`api/pts/${con}/approvers`).toPromise();
  }

  getDataStatus(status: any) {
    return this.httpClient.get<any>(`api/pts/my/status?type=${status}`).toPromise();
  }

  getDataVali(val: any) {
    return this.httpClient.get<any>(`api/pts/validation/${val}`).toPromise();
  }

  saveData(data: any) {
    return this.httpClient.post<any>(`api/pts`, data).toPromise();
  }

  putDataKey(data: any, Id: any) {
    return this.httpClient.put<any>(`api/pts/${Id}`, data).toPromise();
  }

  deleteData(Id: any) {
    return this.httpClient.delete<any>(`api/pts/${Id}`).toPromise();
  }

}
