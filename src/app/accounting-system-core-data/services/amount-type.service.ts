import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AuthService} from '../../shared/services/auth.service';
import {BaseService} from '../../shared/services/base.service';
import {AmountType} from '../models/amount-type';

@Injectable()
export class AmountTypeService extends BaseService {
  private readonly baseUrl: string = '/backend/amounttype/api/v1/amountType';

  getAllAmountTypes(): Observable<AmountType[]> {
    return this.httpClient.get<AmountType[]>(
        `${this.baseUrl}/selectAll/${this.tenant}`, {observe: 'body'});
  }
}
