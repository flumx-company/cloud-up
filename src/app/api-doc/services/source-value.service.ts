import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SourceValueService {

  constructor(protected httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get<any>(`api/configuration/source-values`).toPromise();
  }

  saveData(data: any) {
    return this.httpClient.post<any>(`api/configuration/source-values`, data).toPromise();
  }

  putDataKey(data: any) {
    return this.httpClient.put<any>(`api/configuration/source-values`, data).toPromise();
  }

  deleteData() {
    return this.httpClient.delete<any>(`api/configuration/source-values`).toPromise();
  }

}
