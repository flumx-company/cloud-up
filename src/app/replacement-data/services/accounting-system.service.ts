import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

import {BaseService} from '../../shared/services/base.service';
import {AccountingSystem} from '../models/accounting-system';

@Injectable()
export class AccountingSystemService extends BaseService {
  private readonly baseUrl: string =
      '/backend/accountingSystem/api/v1/accountingSystem';

  getAccountingSystemsForTenant(): Observable<AccountingSystem[]> {
    return this.httpClient
        .get<AccountingSystem[]>(
            `${this.baseUrl}/getAccountingSystemsForTenant/${this.tenant}`,
            {observe: 'body'})
        .catch(this.handleError);
  }

  // tslint:disable-next-line:no-any
  handleError(err: any): ErrorObservable {
    console.log(err);
    return new ErrorObservable('error');
  }
}
