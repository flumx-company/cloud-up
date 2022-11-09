import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../shared/services/base.service';
import {AmountType} from '../models';

@Injectable()
export class InternalReasonCodesService extends BaseService {
  private readonly baseUrl: string = '/backend/amounttype/api/v1/amountType';

  create(type: AmountType): Observable<AmountType> {
    type.tenant = this.tenant;
    return this.httpClient.post<AmountType>(`${this.baseUrl}/insert`, type);
  }

  read(): Observable<AmountType[]> {
    return this.httpClient.get<AmountType[]>(
        `${this.baseUrl}/selectAll/${this.tenant}`);
  }

  update(type: AmountType): Observable<AmountType> {
    return this.httpClient.put<AmountType>(`${this.baseUrl}/update`, type);
  }

  // tslint:disable-next-line:no-any
  delete(type: AmountType): Observable<HttpResponse<any>> {
    return this.httpClient.request(
        'delete', this.baseUrl, {body: type, observe: 'response'});
  }
}
