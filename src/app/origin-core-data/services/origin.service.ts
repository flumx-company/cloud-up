import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../shared/services/base.service';
import {ConfigService} from '../../shared/services/config.service';
import {EntityId} from '../models/entity-id';
import {Origin} from '../models/origin';

@Injectable()
export class OriginService extends BaseService {
  private baseUrl = '/backend/OriginCoreData/api/v1/origin';

  saveOrigin(origin: Origin): Observable<Origin[]> {
    origin.id.tenant = this.tenant;
    const originArray = [origin];
    return this.httpClient.put<Origin[]>(
        `${this.baseUrl}`, originArray, {observe: 'body'});
  }

  updateOrigins(origins: Origin[]): Observable<Origin[]> {
    origins.forEach(origin => origin.id.tenant = this.tenant);
    return this.httpClient.put<Origin[]>(
        `${this.baseUrl}`, origins, {observe: 'body'});
  }

  readOrigin(originId: EntityId): Observable<Origin> {
    originId.tenant = this.tenant;
    return this.httpClient.post<Origin>(
        `${this.baseUrl}/readOrigin`, originId, {observe: 'body'});
  }

  readAllOrigins(): Observable<Origin[]> {
    return this.httpClient.get<Origin[]>(
        `${this.baseUrl}/${this.tenant}`, {observe: 'body'});
  }

  readOriginsForGroup(originGroupId: EntityId): Observable<Origin[]> {
    originGroupId.tenant = this.tenant;
    return this.httpClient.post<Origin[]>(
        `${this.baseUrl}/readOriginsByOriginGroup`, originGroupId,
        {observe: 'body'});
  }

  // tslint:disable-next-line:no-any
  deleteOrigin(originId: EntityId): Observable<any> {
    originId.tenant = this.tenant;
    return this.httpClient.request(
        'delete', `${this.baseUrl}`, {body: originId, observe: 'body'});
  }
}
