import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class TranslationService {

  constructor(protected httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get<any>(`api/configuration/translation`).toPromise();
  }

  saveData(data: any) {
    return this.httpClient.post<any>(`api/configuration/translation`, data).toPromise();
  }

  putDataKey(data: any) {
    return this.httpClient.put<any>(`api/configuration/translation`, data).toPromise();
  }

  deleteData() {
    return this.httpClient.delete<any>(`api/configuration/translation`).toPromise();
  }

}
