import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { RecordInterface } from "../interface/record.interface";

@Injectable()
export class RecordTypeService {

  constructor(protected httpClient: HttpClient) { }

  getRecordDocument() {
    return this.httpClient.get<RecordInterface>(`api/configuration/record-types`)
        .pipe(
            map((data: any) => {
              data.TYPES = data.TYPES.map((item: any) => {
                item.DESCRIPTIONS = Array.isArray(item.DESCRIPTIONS) ? item.DESCRIPTIONS : [{...item.DESCRIPTIONS}];
                return item;
              });
              return data
            })
        )
  }

  setRecordDocument(data: any) {
    return this.httpClient.post<any>(`api/configuration/record-types`, data)
  }

  putRecordValues(data: RecordInterface) {
    return this.httpClient.put<RecordInterface>(`api/configuration/record-types`, data)
        .toPromise()
  }

  deleteRecordeValues() {
    return this.httpClient.delete<RecordInterface>(`api/configuration/record-types`)
  }

  agentType(){
    return this.httpClient.get<RecordInterface>(`api/master-data/agent-type`)
        .pipe(
            map((data:any) => data.map((item:any) => item.TYPE))
        )
  }
  test(currencyStatic:any){
    return new Promise((resolve, reject):any => {
      // setTimeout(function(){
      resolve({data: currencyStatic, totalCount: currencyStatic.length})
      // },300)
    })
  }
}
