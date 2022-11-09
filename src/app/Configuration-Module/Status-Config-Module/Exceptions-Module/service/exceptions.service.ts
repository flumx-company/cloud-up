import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ExceptionService {
  constructor(public httpClient: HttpClient) {
  }

  getData() {
    return this.httpClient.get('/api/master-data/messages').toPromise();
  }

  getAgentType() {
    return this.httpClient.get<any>('/api/master-data/agent-type').toPromise();
  }

  saveData(data: any) {
    return this.httpClient.post('/api/master-data/messages', data).toPromise();
  }

  putDataKey(data: any, msg_no: any) {
    return this.httpClient.put('/api/master-data/messages/' + msg_no, data).toPromise();
  }

  deleteData(Id: any) {
    return this.httpClient.delete<any>('/api/master-data/messages/' + Id).toPromise();
  }
}
