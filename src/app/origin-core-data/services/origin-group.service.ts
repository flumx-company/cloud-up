import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../shared/services/base.service';
import {EntityId} from '../models/entity-id';
import {OriginGroup} from '../models/origin-group';

@Injectable()
export class OriginGroupService extends BaseService {
  private baseUrl = '/backend/OriginCoreData/api/v1/originGroup';
  private getOriginGroupsForTenantUrl =
      `${this.baseUrl}/getOriginGroupsForTenant`;

  saveOriginGroup(originGroup: OriginGroup): Observable<OriginGroup[]> {
    originGroup.id.tenant = this.tenant;
    const originGroupArray = [originGroup];
    return this.httpClient.put<OriginGroup[]>(
        `${this.baseUrl}`, originGroupArray, {observe: 'body'});
  }

  readOriginGroup(originGroupId: EntityId): Observable<OriginGroup> {
    originGroupId.tenant = this.tenant;
    return this.httpClient.get<OriginGroup>(
        `${this.baseUrl}/${originGroupId.tenant}?id=${originGroupId.id}`,
        {observe: 'body'});
  }

  readAllOriginGroups(): Observable<OriginGroup[]> {
    return this.httpClient.get<OriginGroup[]>(
        `${this.getOriginGroupsForTenantUrl}/${this.tenant}`,
        {observe: 'body'});
  }

  // tslint:disable-next-line:no-any
  deleteOriginGroup(originGroupId: EntityId): Observable<any> {
    originGroupId.tenant = this.tenant;
    return this.httpClient.request(
        'delete', `${this.baseUrl}`, {body: originGroupId, observe: 'body'});
  }
}
