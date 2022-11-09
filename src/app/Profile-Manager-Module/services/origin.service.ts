import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../shared/services/base.service';
import {EntityId, Origin} from '../models';

@Injectable()
export class OriginService extends BaseService {
  private baseUrl = '/backend/OriginCoreData/api/v1/origin';

  readOriginsWithSequence(sequenceId: EntityId): Observable<Origin[]> {
    sequenceId.tenant = this.tenant;
    return this.httpClient.get<Origin[]>(
        `${this.baseUrl}/${sequenceId.tenant}/${sequenceId.name}`,
        {observe: 'body'});
  }

  readAllOrigins(): Observable<Origin[]> {
    return this.httpClient.get<Origin[]>(
        `${this.baseUrl}/${this.tenant}`, {observe: 'body'});
  }

  determineUsageOfSequences(sequenceNames: string[]): Observable<string[]> {
    return this.httpClient.post<string[]>(
        `${this.baseUrl}/determineUsageOfSequences/${this.tenant}`,
        sequenceNames, {observe: 'body'});
  }
}
