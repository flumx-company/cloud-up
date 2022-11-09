import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class ValidationService {

  constructor(protected httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get<any>(`api/configuration/validation/rules`).toPromise();
  }

  saveData(data: any) {
    return this.httpClient.post<any>(`api/configuration/validation/rules`, data).toPromise();
  }

  putDataKey(data: any, Id: any) {
    return this.httpClient.put<any>(`api/configuration/validation/rules/${Id}`, data).toPromise();
  }

  deleteData(Id: any) {
    return this.httpClient.delete<any>(`api/configuration/validation/rules/${Id}`).toPromise();
  }

}
