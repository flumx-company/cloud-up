import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AccountingSystem} from '../models/accounting-system';

@Injectable()
export class AccountingSystemService {
  private baseUrl = '/backend/accountingSystem/api/v1/accountingSystem';
  private tenant = 1;

  constructor(private httpClient: HttpClient) {
  }

  readAllAccountingSystems(): Observable<AccountingSystem[]> {
    return this.httpClient.get<AccountingSystem[]>(
      `${this.baseUrl}/getAccountingSystemsForTenant/${this.tenant}`,
      {observe: 'body'});
  }
}
