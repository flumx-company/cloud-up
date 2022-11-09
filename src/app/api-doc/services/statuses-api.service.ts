import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class StatusesApiService {

  constructor(protected httpClient: HttpClient) {}

  getData() {
    return this.httpClient.get<any>(`api/status`).toPromise();
  }

  saveData(data: any, rec_type : any) {
    return this.httpClient.post<any>(`api/status/${rec_type}`, data).toPromise();
  }

  getDataByKey(con: any) {
    return this.httpClient.get<any>(`api/status/${con}`).toPromise();
  }

  putDataKey(status: any, recno: any ,data: any) {
    return this.httpClient.put<any>(`api/status/${recno}/${status}`, data).toPromise();
  }

  deleteDataKey(rec_type: any, status: any) {
    return this.httpClient.delete<any>(`api/status/${rec_type}/${status}`).toPromise();
  }

}
