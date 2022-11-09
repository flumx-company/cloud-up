import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {BaseService} from '../../shared/services/base.service';
import {EntityId} from '../models/entity-id';
import {FineFilter} from '../models/fine-filter';

@Injectable()
export class FineFilterService extends BaseService {
  private baseUrl = '/backend/finefilters/api/v1/finefilters';

  getFilterById(filterId: EntityId): Observable<FineFilter> {
    filterId.tenant = this.tenant;
    return this.httpClient.post<FineFilter>(
        `${this.baseUrl}/findById`, filterId, {observe: 'body'});
  }

  getFilterForTenant(): Observable<FineFilter[]> {
    return this.httpClient.get<FineFilter[]>(
        `${this.baseUrl}/${this.tenant}`, {observe: 'body'});
  }

  createFilter(fineFilter: FineFilter): Observable<FineFilter> {
    fineFilter.filterId!.tenant = this.tenant;
    return this.httpClient.post<FineFilter>(
        `${this.baseUrl}`, fineFilter, {observe: 'body'});
  }

  updateFilter(fineFilter: FineFilter): Observable<FineFilter> {
    fineFilter.filterId!.tenant = this.tenant;
    return this.httpClient.put<FineFilter>(
        `${this.baseUrl}`, fineFilter, {observe: 'body'});
  }

  // tslint:disable-next-line:no-any
  removeFilter(filterId: EntityId): Observable<any> {
    filterId.tenant = this.tenant;
    return this.httpClient.request(
        'delete', this.baseUrl, {body: filterId, observe: 'body'});
  }
}
