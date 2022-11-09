import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class LogicalSystemService {

  constructor(protected httpClient: HttpClient) { }

  getDataDemo() {
    return [
      {
        'LOGICAL_SYSTEM': 'D03',
        'SYSTEM_TYPE': 'SAP',
        'URL': 'dolr3472.dolphin-corp.com',
        'UNAME': 'd03_rfc',
        'PASSWD': 'doltest1',
        'ACTIVE': true,
        '__KEY__': 'bb8a76ab-5436-b8d2-5530-0da1afdf3cbe',
        'DESCRIPTION': {
          'DESCRIPTION': 'SAP 4.7 system'
        }
      },
      {
        'LOGICAL_SYSTEM': 'E6C',
        'SYSTEM_TYPE': 'SAP',
        'URL': 'dolecc60a.dolphin-corp.com',
        'UNAME': 'e6c_rfc',
        'PASSWD': 'doltest1',
        'ACTIVE': true,
        '__KEY__': 'a37ce8db-24ab-4593-435e-edeea6145eb1',
        'DESCRIPTION': {
          'DESCRIPTION': 'E6C ECC EHP4'
        }
      },
      {
        'LOGICAL_SYSTEM': 'E6M',
        'SYSTEM_TYPE': 'SAP',
        'URL': 'dolecc60m.dolphin-corp.com',
        'UNAME': 'e6m_rfc',
        'PASSWD': 'doldev1',
        'ACTIVE': true,
        '__KEY__': 'c3ca3c16-36d1-96ae-abe5-94b3863faef2',
        'DESCRIPTION': {
          'DESCRIPTION': 'E6M System'
        }
      },
      {
        'LOGICAL_SYSTEM': 'E6T',
        'SYSTEM_TYPE': 'SAP',
        'URL': '',
        'UNAME': '',
        'PASSWD': '',
        'ACTIVE': true,
        '__KEY__': '13f83e83-c297-164e-6333-b4d93fecd3c0',
        'DESCRIPTION': {
          'DESCRIPTION': 'E6T System'
        }
      },
      {
        'LOGICAL_SYSTEM': 'E6T',
        'SYSTEM_TYPE': 'SAP',
        'URL': '',
        'UNAME': '',
        'PASSWD': '',
        'ACTIVE': true,
        '__KEY__': '13f83e83-c297-164e-6333-b4d93fecd3c0',
        'DESCRIPTION': {
          'DESCRIPTION': 'E6T System'
        }
      }
    ]
  }

  getData() {
    return this.httpClient.get<any>(`api/master-data/logical-system`).toPromise();
  }

  getDataLogical(log: any) {
    return this.httpClient.get<any>(`api/master-data/logical-system/${log}`).toPromise();
  }

  saveData(data: any) {
    return this.httpClient.post<any>(`api/master-data/logical-system`, data).toPromise();
  }

  putDataKey(data: any) {
    return this.httpClient.put<any>(`api/master-data/logical-system/${data.LOGICAL_SYSTEM}`, data).toPromise();
  }

  deleteData(Id: any) {
    return this.httpClient.delete<any>(`api/master-data/logical-system/${Id}`).toPromise();
  }

}
