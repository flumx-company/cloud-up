import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseService} from '../../shared/services/base.service';
import {ReplacementData, ReplacementDataType} from '../models/replacement-data';

@Injectable()
export class ReplacementDataService extends BaseService {
  private readonly baseUrl: string = '/backend/replacement/api/v1/replacement';

  getReplacementDataForTenant(): Observable<ReplacementData[]> {
    return this.httpClient
        .get<ReplacementData[]>(
            `${this.baseUrl}/${this.tenant}`, {observe: 'body'})
        .catch(error => Observable.throw(error));
  }

  insertReplacementData(replacementData: ReplacementData):
      Observable<ReplacementData[]> {
    if (!replacementData) {
      throw new Error(
          'Required parameter replacementData was null or undefined when calling insertReplacementData.');
    }
    replacementData = this.translateReplacementType(replacementData);
    replacementData.tenantId = this.tenant;
    return this.httpClient
        .post<ReplacementData[]>(`${this.baseUrl}`, replacementData, {
          observe: 'body',
        })
        .catch(error => Observable.throw(error));
  }

  updateReplacementData(replacementData: ReplacementData):
      Observable<ReplacementData[]> {
    if (!replacementData) {
      throw new Error(
          'Required parameter replacementData was null or undefined when calling updateReplacementData.');
    }
    replacementData = this.translateReplacementType(replacementData);
    replacementData.tenantId = this.tenant;
    return this.httpClient
        .put<ReplacementData[]>(`${this.baseUrl}`, replacementData, {
          observe: 'body',
        })
        .catch(error => Observable.throw(error));
  }

  // tslint:disable-next-line:no-any
  deleteReplacementData(replacementData: ReplacementData): Observable<any> {
    if (!replacementData) {
      throw new Error(
          'Required parameter replacementData was null or empty when calling deleteReplacementData.');
    }
    replacementData = this.translateReplacementType(replacementData);
    replacementData.tenantId = this.tenant;
    return this.httpClient
        .request<number>(
            'delete', `${this.baseUrl}`,
            {body: replacementData, observe: 'body'})
        .catch(error => Observable.throw(error));
  }

  private translateReplacementType(data: ReplacementData) {
    if (data.replacementType === ReplacementDataType.SIMPLE) {
      data.replacementType = 'SIMPLE';
    } else {
      data.replacementType = 'CROSS_CHECKING';
    }
    return data;
  }
}
