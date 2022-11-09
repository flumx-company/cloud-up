import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {v4 as UUIDv4} from 'uuid';

import {AuthService} from '../../shared/services/auth.service';
import {BaseService} from '../../shared/services/base.service';
import {AccountingSystem} from '../models/accounting-system';

@Injectable()
export class AccountingSystemCoreDataService extends BaseService {
  private readonly baseUrl: string =
      '/backend/accountingSystem/api/v1/accountingSystem';

  getAccountingSystemTypes(): Observable<string[]> {
    return this.httpClient.get<string[]>(
        `${this.baseUrl}/getTypes`, {observe: 'body'});
  }

  getAccountingSystems(): Observable<AccountingSystem[]> {
    return this.httpClient
        .get<AccountingSystem[]>(
            `${this.baseUrl}/getAccountingSystemsForTenant/${this.tenant}`,
            {observe: 'body'})
        .map((response: AccountingSystem[]) => {
          if (response) {
            response.forEach(system => this.setUUIDs(system));
          }
          return response;
        })
        .catch(error => Observable.throw(error));
  }

  getAccountingSystem(accountingSystemId: number):
      Observable<AccountingSystem> {
    return this.httpClient
        .post<AccountingSystem>(`${this.baseUrl}`, accountingSystemId, {
          observe: 'body',
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
        .map((response: AccountingSystem) => {
          this.setUUIDs(response);
          return response;
        })
        .catch(error => Observable.throw(error));
  }

  insertAccountingSystem(accountingSystem: AccountingSystem):
      Observable<AccountingSystem> {
    accountingSystem.tenant = this.tenant;
    return this.httpClient.put<AccountingSystem>(
        `${this.baseUrl}/insert`, accountingSystem, {observe: 'body'});
  }

  updateAccountingSystem(accountingSystem: AccountingSystem):
      Observable<AccountingSystem> {
    accountingSystem.tenant = this.tenant;
    return this.httpClient.post<AccountingSystem>(
        `${this.baseUrl}/update`, accountingSystem, {observe: 'body'});
  }

  // tslint:disable-next-line:no-any
  deleteAccountingSystem(accountingSystemId: number): Observable<any> {
    return this.httpClient.request<number>('delete', `${this.baseUrl}`, {
      body: accountingSystemId,
      observe: 'body',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  private setUUIDs(accountingSystem: AccountingSystem) {
    if (accountingSystem && accountingSystem.exportReasonCodes) {
      accountingSystem.exportReasonCodes.forEach(code => code.uuid = UUIDv4());
    }
  }
}
