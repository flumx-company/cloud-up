import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class OperationalService {

  constructor(protected httpClient: HttpClient) { }

  getDataLive() {
    return this.httpClient.get<any>(`live`).toPromise();
  }

  getDataReady() {
    return this.httpClient.get<any>(`ready`).toPromise();
  }

}
