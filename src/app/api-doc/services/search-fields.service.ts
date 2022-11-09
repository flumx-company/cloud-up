import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class SearchFieldsService {

  constructor(protected httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get<any>(`api/configuration/search-fields`).toPromise();
  }

  saveData(data: any) {
    return this.httpClient.post<any>(`api/configuration/search-fields`, data).toPromise();
  }

  putDataKey(data: any) {
    return this.httpClient.put<any>(`api/configuration/search-fields`, data).toPromise();
  }

  deleteData() {
    return this.httpClient.delete<any>(`api/configuration/search-fields`).toPromise();
  }

}
