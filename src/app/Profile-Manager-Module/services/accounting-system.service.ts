import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../shared/services/base.service';
import {AccountingSystem} from '../models/accounting-system';

@Injectable()
export class AccountingSystemService extends BaseService {
  private baseUrl = '/backend/accountingSystem/api/v1/accountingSystem';

  readAllAccountingSystems(): Observable<AccountingSystem[]> {
    return this.httpClient.get<AccountingSystem[]>(
        `${this.baseUrl}/getAccountingSystemsForTenant/${this.tenant}`,
        {observe: 'body'});
  }
}
