import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class FieldConfigsService {

  constructor(protected httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get<any>(`api/configuration/field-configs`).toPromise();
  }

  saveData(data: any) {
    return this.httpClient.post<any>(`api/configuration/field-configs`, data).toPromise();
  }

  putDataKey(data: any) {
    return this.httpClient.put<any>(`api/configuration/field-configs`, data).toPromise();
  }

  deleteData() {
    return this.httpClient.delete<any>(`api/configuration/field-configs`).toPromise();
  }

}
