import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../shared/services/base.service';
import {EntityId, OriginGroup} from '../models';

@Injectable()
export class OriginGroupService extends BaseService {
  private baseUrl = '/backend/OriginCoreData/api/v1/originGroup';
  private getOriginGroupsForTenantUrl =
      `${this.baseUrl}/getOriginGroupsForTenant`;

  readOriginGroupsWithSequence(sequenceId: EntityId):
      Observable<OriginGroup[]> {
    sequenceId.tenant = this.tenant;
    return this.httpClient.get<OriginGroup[]>(
        `${this.baseUrl}/${sequenceId.tenant}/${sequenceId.name}`,
        {observe: 'body'});
  }

  readAllOriginGroups(): Observable<OriginGroup[]> {
    return this.httpClient.get<OriginGroup[]>(
        `${this.getOriginGroupsForTenantUrl}/${this.tenant}`,
        {observe: 'body'});
  }

  determineUsageOfSequences(sequenceNames: string[]): Observable<string[]> {
    return this.httpClient.post<string[]>(
        `${this.baseUrl}/determineUsageOfSequences/${this.tenant}`,
        sequenceNames, {observe: 'body'});
  }
}
