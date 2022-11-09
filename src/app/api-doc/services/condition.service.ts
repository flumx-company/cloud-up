import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ConditionService {

  constructor(protected httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get<any>(`api/configuration/conditions`).toPromise();
  }

  getDataCondition(con: any) {
    return this.httpClient.get<any>(`api/configuration/conditions/${con}`).toPromise();
  }

  saveData(data: any) {
    return this.httpClient.post<any>(`api/configuration/conditions`, data).toPromise();
  }

  putDataKey(data: any, Id: any) {
    return this.httpClient.put<any>(`api/configuration/conditions/${Id}`, data).toPromise();
  }

  deleteData(con: any) {
    return this.httpClient.delete<any>(`api/configuration/conditions/${con}`).toPromise();
  }

}
