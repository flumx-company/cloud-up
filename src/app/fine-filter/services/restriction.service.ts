import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {BaseService} from '../../shared/services/base.service';
import {EntityId} from '../models/entity-id';
import {Restriction} from '../models/restriction';
import {UsageInfoFilter} from '../models/usage-info-filter';

@Injectable()
export class RestrictionService extends BaseService {
  private baseUrl = '/backend/restrictions/api/v1/restrictions';

  // tslint:disable-next-line:no-any
  isFilterUsed(filterId: EntityId): Observable<any> {
    filterId.tenant = this.tenant;
    return this.httpClient.get(
        `${this.baseUrl}/isFilterUsed/${filterId.tenant}/${filterId.name}`);
  }

  checkFilterUsage(filterIds: EntityId[]): Observable<UsageInfoFilter> {
    filterIds.forEach(id => id.tenant = this.tenant);
    return this.httpClient.post<UsageInfoFilter>(
        `${this.baseUrl}/checkFilterUsage`, filterIds, {observe: 'body'});
  }

  getByFilter(name: string): Observable<Restriction[]> {
    return this.httpClient.get<Restriction[]>(
        `${this.baseUrl}/getByFilter/${this.tenant}/${name}`,
        {observe: 'body'});
  }
}
