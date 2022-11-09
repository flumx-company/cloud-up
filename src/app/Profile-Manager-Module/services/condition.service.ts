import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {isNullOrUndefined} from 'util';

import {BaseService} from '../../shared/services/base.service';
import {Condition, EntityId} from '../models';

@Injectable()
export class ConditionService extends BaseService {
  private readonly baseUrl = '/backend/Conditions-module/api/v1/Conditions-module';

  saveCondition(condition: Condition): Observable<Condition> {
    condition.entityId.tenant = this.tenant;
    this.fixEnumTypes(condition);
    return this.httpClient.post<Condition>(
        `${this.baseUrl}/`, condition, {observe: 'body'});
  }

  updateCondition(condition: Condition): Observable<Condition> {
    this.fixEnumTypes(condition);
    condition.entityId.tenant = this.tenant;
    return this.httpClient.put<Condition>(
        `${this.baseUrl}/`, condition, {observe: 'body'});
  }

  deleteCondition(conditionId: EntityId) {
    conditionId.tenant = this.tenant;
    return this.httpClient.request(
        'delete', `${this.baseUrl}/`, {body: conditionId, observe: 'body'});
  }

  readConditionForProfile(profileId: EntityId): Observable<Condition[]> {
    profileId.tenant = this.tenant;
    return this.httpClient.get<Condition[]>(
        `${this.baseUrl}/${profileId.tenant}?processProfile=${
            encodeURIComponent(profileId.name)}`,
        {observe: 'body'});
  }

  readAllConditions(): Observable<Condition[]> {
    return this.httpClient.get<Condition[]>(
        `${this.baseUrl}/${this.tenant}`, {observe: 'body'});
  }

  determineUsage(conditionIdList: EntityId[]): Observable<EntityId[]> {
    conditionIdList.forEach(id => id.tenant = this.tenant);
    return this.httpClient.post<EntityId[]>(
        `${this.baseUrl}/determineUsage`, conditionIdList, {observe: 'body'});
  }

  private fixEnumTypes(condition: Condition) {
    ['status', 'formatType'].forEach(field => {
      if (isNullOrUndefined(condition[field]) ||
          condition[field].length === 0) {
        condition[field] = null;
      }
    });

    condition.parts.forEach(part => ['operator', 'operation'].forEach(field => {
      if (isNullOrUndefined(part[field]) || part[field].length === 0) {
        part[field] = null;
      }
    }));
  }
}
